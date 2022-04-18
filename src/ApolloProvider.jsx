import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import App from './App';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const Apollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
export default Apollo;
