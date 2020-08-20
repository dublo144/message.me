import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import 'antd/dist/antd.css';
import { backendUrl } from './config/settings';
import { AuthProvider } from './contexts/AuthContext';
import './index.less';

const httpLink = createHttpLink({
  uri: backendUrl
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('jwtToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` })
    }
  };
});

const client = new ApolloClient({
  uri: backendUrl,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
