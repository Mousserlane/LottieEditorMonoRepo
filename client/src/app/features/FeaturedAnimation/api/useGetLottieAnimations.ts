
import { GET_FEATURED_ANIMATIONS } from '@/app/services/queries'
import { useSuspenseQuery } from '@apollo/client'
export const useGetFeaturedAnimations = () => {
  return useSuspenseQuery(GET_FEATURED_ANIMATIONS)
}