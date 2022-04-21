import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { AuthProvider } from 'store/auth-context';
import MenuBar from 'components/MenuBar';
import Route from 'routes/Route';

import './App.module.css';

const App = () => (
    <AuthProvider>
        <Container>
            <MenuBar />
            <Route />
        </Container>
    </AuthProvider>
);

export default App;
