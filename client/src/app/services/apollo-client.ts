import { ApolloClient, InMemoryCache } from '@apollo/client'

const createApolloClient = () => new ApolloClient({
  uri: "https://graphql.lottiefiles.com",
  cache: new InMemoryCache()
})


export default createApolloClient

