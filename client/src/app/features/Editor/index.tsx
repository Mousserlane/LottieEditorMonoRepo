'use client'
import React, { useEffect, useState } from 'react';
import { LottiePlayer } from './components/LottiePlayer';
import { useWebSocketSession } from '../../context/WebSocketContextProvider';
import { Dropzone, Modal } from '../../components';
import LayerManager from '../LayerManager';
import { useStore } from '@/app/stores';
import Toolkit from '../Toolkit';
import FeaturedAnimation from '../FeaturedAnimation';
import { MESSAGE_TYPE } from '../Websocket/types';
import { useCollaboration } from '@/app/hooks/useCollaboration';
import { getRandomColor } from '@/app/utils/clientColorRandomizer';
import { Header } from './components/Header';


// NOTE : Websocket should be a context provider that wraps Editor Page
interface IEditorProps { }

const Editor: React.FC<IEditorProps> = () => {
  const { setAnimationAndLayers, animation, setClientId, setColorScheme } = useStore();
  const { clientId, getActiveAnimation, getMessage, sendMessage } = useCollaboration()

  useEffect(() => {
    if (clientId) {
      setClientId(clientId);
      // NOTE : Possible color clash
      setColorScheme(getRandomColor());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId])

  const [isModalShown, setIsModalShown] = useState(false);

  // TODO : upload animation data. Should be a hook
  useEffect(() => {
    const uploadAnimationData = async () => {
      try {
        await fetch('http://localhost:3000/collaborate', { method: "POST", body: JSON.stringify(animation) });
      } catch (error) {
        console.log('error fetch', error)
      }
    }

    const parsedMessage = getMessage();

    if (animation && parsedMessage?.type !== MESSAGE_TYPE.HAS_ACTIVE_FILE) {
      uploadAnimationData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation])

  useEffect(() => {
    const activeAnimationData = getActiveAnimation();
    if (!animation) {
      setAnimationAndLayers(JSON.parse(activeAnimationData!));
    }
  }, [getMessage, animation])

  const onDrop = async (animationData: string) => {
    // TODO : need to send the data to server to be streamed
    setAnimationAndLayers(JSON.parse(animationData))
  }

  const showModal = () => {
    setIsModalShown(true)
  }

  const hideModal = () => {
    setIsModalShown(false)
  }


  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
      <Header />
      <div className='flex justify-evenly items-center h-screen border-r-2 border-r-gray-300'>
        <LayerManager />
        <div className='bg-slate-300 w-3/4 h-full px-4'>
          {animation ? <LottiePlayer animationData={JSON.stringify(animation)} /> : <Dropzone onDrop={onDrop} onPickFromLottie={showModal} />}
        </div>
        <div className='bg-gray-100 w-1/3 h-full'>
          <Toolkit />
        </div>
      </div>

      {isModalShown && <Modal closeModal={hideModal}>
        <div className='px-4 py-3 border-b border-gray-200'>
          Header
        </div>
        <div className="px-4 py-5 flex flex-wrap flex-1 overflow-hidden">
          <FeaturedAnimation closeModal={hideModal} />
        </div>
        <div className="px-4 py-3 border-t border-gray-200">
          <button onClick={hideModal}>Close Modal</button>
        </div>
      </Modal>}
    </div>
  )
}
export default Editor