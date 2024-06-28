import React, { FC, Suspense } from 'react'
import { useGetFeaturedAnimations } from './api/useGetLottieAnimations'
import { FeaturedAnimationItem } from './components/FeaturedAnimationItem';
import { useStore } from '@/app/stores';

// TODO : Fix Type
interface IFeaturedAnimationProps {
  closeModal: () => void;
  uploadAnimation: (animationData: string) => void;
}
const FeaturedAnimation: FC<IFeaturedAnimationProps> = ({ closeModal, uploadAnimation }) => {
  const { data, error } = useGetFeaturedAnimations()
  const { setAnimationAndLayers } = useStore()
  const { featuredPublicAnimations } = data as any;
  const featuredAnimations = featuredPublicAnimations?.edges;

  const onSelectAnimation = async (animationURL: string) => {
    const res = await fetch(animationURL);
    const parsedJSON = await res.json();
    setAnimationAndLayers(parsedJSON);
    uploadAnimation(JSON.stringify(parsedJSON))
    closeModal()
  }

  return (
    <Suspense fallback={<p>Loading hihi</p>}>
      {featuredAnimations.map((anim: any, index: number) => (
        <FeaturedAnimationItem animationData={anim} key={index} onSelectAnimation={onSelectAnimation} />
      ))}
    </Suspense>
  )
}

export default FeaturedAnimation