import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from 'store/auth-context';

const useAuth = () => {
    const token = localStorage.getItem('token');
    const user = { isLoggedIn: token };
    return user?.isLoggedIn;
};
const ProtectedRoute = () => {
    const authCtx = useContext(AuthContext);
    const auth = useAuth();

    const isAuth = authCtx.user && auth;

    return isAuth ? <Navigate replace to="/" /> : <Outlet />;
};

export default ProtectedRoute;
