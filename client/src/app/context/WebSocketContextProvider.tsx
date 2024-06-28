import React, { FC, PropsWithChildren, createContext, useContext } from 'react'
import useWebSocket, { ReadyState, SendMessage } from 'react-use-websocket';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import { MESSAGE_TYPE } from '../features/Websocket/types';

const WS_URL = 'ws://localhost:3000/collaborate'

type ConnectionStatusMap = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
}
type WebSocketContextProps = {
  connectionStatus: ConnectionStatusMap[ReadyState]
  sendMessage: SendMessage,
  message: MessageEvent<any> | null,
  sendJsonMessage: SendJsonMessage
}

const WebSocketContext = createContext<WebSocketContextProps>({} as any)
export const WebSocketContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { sendMessage, lastMessage, readyState, sendJsonMessage } = useWebSocket(WS_URL, {
    heartbeat: {
      message: JSON.stringify({ type: MESSAGE_TYPE.PING, data: "Ping" }),
      returnMessage: JSON.stringify({ type: MESSAGE_TYPE.PONG, data: "Pong" }),
      timeout: 120000,
      interval: 60000
    }
  })


  const connectionStatus: ConnectionStatusMap = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
  }

  return <WebSocketContext.Provider value={{
    connectionStatus: connectionStatus[readyState],
    sendMessage,
    sendJsonMessage,
    message: lastMessage
  }}>
    {children}
  </WebSocketContext.Provider>
}

export const useWebSocketSession = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocketSession must be used inside a WebSocketContext")
  }
  return context;
}
