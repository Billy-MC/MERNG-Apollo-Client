import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

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
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>
);
export default Apollo;
