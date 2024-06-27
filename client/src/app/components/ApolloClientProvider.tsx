'use client'
import { ApolloProvider } from '@apollo/client'
import React, { FC, PropsWithChildren } from 'react'
import createApolloClient from '../services/apollo-client'

const client = createApolloClient();
const ApolloClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
}

export default ApolloClientProvider
