import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { defaults, resolvers } from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

const PROD_ENDPOINT = 'https://wwww.api.palettable.io/graphql';
const LOCAL_ENDPOINT = 'http://localhost:4000/graphql';
const isLocal = window.location.href.indexOf('localhost') !== -1;
const GRAPHQL_ENDPOINT = isLocal ? LOCAL_ENDPOINT : PROD_ENDPOINT;

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  clientState: {
    defaults,
    resolvers,
    typeDefs,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
