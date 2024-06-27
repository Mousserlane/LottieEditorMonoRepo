'use client'
import React, { useState } from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';
import { relottie } from '@lottiefiles/relottie';
import { LottiePlayer } from './components/LottiePlayer';
import { Dropzone, Modal } from '../../components';
import LayerManager from '../LayerManager';
import { useStore } from '@/app/stores';
import Toolkit from '../Toolkit';
import FeaturedAnimation from '../FeaturedAnimation';


// NOTE : Websocket should be a context provider that wraps Editor Page
interface IEditorProps { }

const Editor: React.FC<IEditorProps> = () => {
  const { setAnimationAndLayers, animation } = useStore();
  const [isModalShown, setIsModalShown] = useState(false);

  // const { sendMessage, lastMessage, readyState, } = useWebSocket('ws://localhost:3000/collaborate', {
  //   heartbeat: {
  //     message: 'ping',
  //     returnMessage: 'pong',
  //     timeout: 60000,
  //     interval: 120000
  //   },
  // })

  const onDrop = (animationData: string) => {
    // const processor = relottie().data('settings', {
    //   parse: { position: false }
    // })

    // const tree = processor.parse(animationData);

    setAnimationAndLayers(JSON.parse(animationData))
  }

  const showModal = () => {
    setIsModalShown(true)
  }

  const hideModal = () => {
    setIsModalShown(false)
  }

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: 'Connecting',
  //   [ReadyState.OPEN]: 'Open',
  //   [ReadyState.CLOSING]: 'Closing',
  //   [ReadyState.CLOSED]: 'Closed',
  //   [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
  // }[readyState]

  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
      <div className='bg-green-400 p-4'>
        <h1>Header</h1>
      </div>
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