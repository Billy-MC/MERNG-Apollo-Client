import {
    ApolloClient,
    ApolloProvider as Provider,
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

const ApolloProvider = () => (
    <Provider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
export default ApolloProvider;
