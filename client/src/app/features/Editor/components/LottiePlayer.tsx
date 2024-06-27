import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';

interface ILottiePlayerProps {
  animationData: string
  width?: number | string,
  height?: number | string,
  disableControl?: boolean,
  autoplay?: boolean
}
export const LottiePlayer: React.FC<ILottiePlayerProps> = ({ animationData, width = 500, height = '80vh', disableControl = false, autoplay = true }) => {
  return (
    <Player autoplay={autoplay} loop src={animationData} style={{ width, height }}>
      {!disableControl && <Controls visible={true} buttons={['play', 'repeat']} />}
    </Player>
  )
}