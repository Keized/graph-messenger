import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Room from "./components/Room";
import Main from './components/Main';
import AuthProvider from './contexts/AuthProvider';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000/graphql',
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

function App() {
  return (
      <ApolloProvider client={client}>
      <AuthProvider>
        <main className="App bg-primary-bg">
            <Main />
        </main>
      </AuthProvider>
      </ApolloProvider>
  )
}

export default App
