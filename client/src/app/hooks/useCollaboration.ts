import { useCallback, useEffect, useState } from "react";
import { useWebSocketSession } from "../context/WebSocketContextProvider"
import { Layer, LottieAnimationBase } from "../features/LayerManager/types";
import { MESSAGE_TYPE, SessionMessage } from "../features/Websocket/types";
import { UserSessionStore } from "../stores/userSessionStore";

const isMessageContainsData = (message: any): message is { data: any } => {
  return message && typeof message === 'object'
}

export const useCollaboration = () => {

  const [clientId, setClientId] = useState<string>();
  const { message, sendMessage, connectionStatus } = useWebSocketSession();

  const getMessage = useCallback(<T>(): MessageEvent<SessionMessage<T>> | null => {
    if (message) {
      return JSON.parse(message.data)
    }

    return null
  }, [message])

  const getActiveAnimation = useCallback((): string | null => {
    const message = getMessage<LottieAnimationBase>();

    if (isMessageContainsData(message)) {
      if (message.type === MESSAGE_TYPE.HAS_ACTIVE_FILE || message.type === MESSAGE_TYPE.FILE_UPLOAD) {
        return message.data as any
      }
    }

    return null
  }, [getMessage])

  const getSelectedLayer = useCallback(() => {
    const message = getMessage() as SessionMessage<any>;

    if (message?.type === MESSAGE_TYPE.CLIENT_SELECT_LAYER) {
      return { layerName: message.data.selectedLayer.nm, clientId: message.data.clientId, colorScheme: message.data.colorScheme }
    }
  }, [getMessage])

  const broadcastUserLayerPosition = useCallback((selectedLayer: Layer, userSessionData: Pick<UserSessionStore, 'clientId'>) => {
    sendMessage(JSON.stringify({
      type: MESSAGE_TYPE.CLIENT_SELECT_LAYER,
      data: { selectedLayer, client: userSessionData }
    }))
  }, [sendMessage])

  useEffect(() => {
    const msg = getMessage() as SessionMessage<any>;
    if (connectionStatus === 'Open' && msg?.data?.hasOwnProperty('clientId')) {
      setClientId(msg?.data?.clientId)
    }
  }, [connectionStatus, getMessage, setClientId])

  return {
    connectionStatus,
    getMessage,
    getActiveAnimation,
    broadcastUserLayerPosition,
    sendMessage,
    clientId,
    getSelectedLayer,
  }
}