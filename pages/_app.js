import {ApolloProvider} from 'react-apollo'
import React from "react"
import {Container} from "next/app"
import ApolloClient from "apollo-boost"

const client = new ApolloClient({
  uri: 'https://wp-api-test.onesword.xyz/graphql',
})

export default props => {
  const {Component, pageProps, apolloClient} = props
  return (
    <Container>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Container>
  )
};