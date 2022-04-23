import {
    ApolloClient,
    ApolloProvider as Provider,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const authLink = setContext((request, previousContext) => {
    const token = localStorage.getItem('token');

    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
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
