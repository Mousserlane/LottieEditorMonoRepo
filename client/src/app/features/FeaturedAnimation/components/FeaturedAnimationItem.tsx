import React, { FC } from 'react'
import { LottiePlayer } from '../../Editor/components/LottiePlayer'

interface IFeaturedAnimationItemProps {
  animationData: {
    // TODO : Should be in ../types.ts
    node: {
      bgColor: string,
      jsonUrl: string
    }
  },
  onSelectAnimation: (animationURL: string) => void
}
export const FeaturedAnimationItem: FC<IFeaturedAnimationItemProps> = ({ animationData, onSelectAnimation }) => {
  return (
    <div
      className='w-32 h-32 bg-slate-300 ml-2 mb-4 flex items-center justify-center'
      onClick={() => onSelectAnimation(animationData.node.jsonUrl)}
    >
      <LottiePlayer animationData={animationData.node.jsonUrl} width={120} height={120} disableControl />
    </div>
  )
}