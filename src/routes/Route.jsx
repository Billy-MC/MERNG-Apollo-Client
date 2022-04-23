import {
    Routes,
    Route as RoutePage,
    Navigate,
} from 'react-router-dom';

import NoMatch from 'pages/NoMatch';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import PageDetail from 'pages/PostDetail';
import ProtectedRoute from './ProtectedRoute';

const Route = () => (
    <Routes>
        <RoutePage
            path="/home"
            element={<Navigate replace to="/" />}
        />
        <RoutePage path="/" index element={<Home />} />
        <RoutePage element={<ProtectedRoute />}>
            <RoutePage path="/login" element={<Login />} />
            <RoutePage path="/register" element={<Register />} />
        </RoutePage>
        <RoutePage path="/post/:postId" element={<PageDetail />} />
        <RoutePage path="*" element={<NoMatch />} />
    </Routes>
);

export default Route;
