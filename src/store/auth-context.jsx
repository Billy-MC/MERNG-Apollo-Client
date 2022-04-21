import { createContext, useReducer, useMemo } from 'react';

const AuthContext = createContext({
    user: null,
    onLogin: user => {},
    onLogout: () => {},
});

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT': {
            return {
                ...state,
                user: null,
            };
        }

        default:
            return state;
    }
};

const AuthProvider = props => {
    const { children } = props;
    const [authState, dispatchAuth] = useReducer(authReducer, {
        user: null,
    });

    const loginHandler = user => {
        localStorage.setItem('token', user.token);

        dispatchAuth({
            type: 'LOGIN',
            payload: user,
        });
    };

    const logoutHandler = () => {
        localStorage.removeItem('token');
        dispatchAuth({ type: 'LOGOUT' });
    };
    const authContext = useMemo(
        () => ({
            user: authState.user,
            onLogin: loginHandler,
            onLogout: logoutHandler,
        }),
        [authState.user],
    );

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
