import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Room from "./components/Room";
import Main from './components/Main';
import AuthProvider from './contexts/AuthProvider';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

function App() {
  return (
      <ApolloProvider client={client}>
      <AuthProvider>
        <div className="App">
            <Main />
        </div>
      </AuthProvider>
      </ApolloProvider>
  )
}

export default App
