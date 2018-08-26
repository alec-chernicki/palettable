import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { defaults, resolvers } from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';
import getServerUrl from './utilities/getServerUrl';

const GRAPHQL_ENDPOINT = `${getServerUrl()}/graphql`;

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
