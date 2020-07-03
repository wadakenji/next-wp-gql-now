import {ApolloProvider} from 'react-apollo'
import React from "react"
import ApolloClient from "apollo-boost"
import fetch from 'node-fetch'
import Header from "../components/Header"

const client = new ApolloClient({
  uri: 'https://wp-api-test.onesword.xyz/graphql',
  credentials: 'include',
  fetch: fetch
})

export default props => {
  const {Component, pageProps} = props
  return (
    <ApolloProvider client={client}>
      <Header/>
      <Component {...pageProps} />
    </ApolloProvider>
  )
};