import { Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import NoMatch from 'pages/NoMatch';
import MenuBar from 'components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.module.css';

const App = () => (
    <Container>
        <MenuBar />
        <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    </Container>
);

export default App;
