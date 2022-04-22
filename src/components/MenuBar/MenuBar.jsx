import { useState, useContext } from 'react';
import { Menu as MainMenu } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';

import { AuthContext } from 'store/auth-context';

const MenuBar = () => {
    const authCtx = useContext(AuthContext);
    const location = useLocation();
    const { pathname } = location;
    const path = pathname === '/' ? 'home' : pathname.split('/')[1];
    const [activeItem, setActiveItem] = useState(path);
    const { Item, Menu } = MainMenu;

    const itemOnClickHandler = (_, value) => {
        const { name } = value;
        return setActiveItem(name);
    };
    const logoutHandler = () => {
        authCtx.onLogout();
    };

    return (
        <MainMenu pointing secondary size="massive" color="teal">
            <Item
                name={authCtx.user ? authCtx.user.username : 'home'}
                active={authCtx.user ? true : activeItem === 'home'}
                onClick={authCtx.user ? null : itemOnClickHandler}
                as={Link}
                to="/"
            />
            <Menu position="right">
                {authCtx.user ? (
                    <Item name="logout" onClick={logoutHandler} />
                ) : (
                    <>
                        <Item
                            name="login"
                            active={activeItem === 'login'}
                            onClick={itemOnClickHandler}
                            as={Link}
                            to="/login"
                        />
                        <Item
                            name="register"
                            active={activeItem === 'register'}
                            onClick={itemOnClickHandler}
                            as={Link}
                            to="/register"
                        />
                    </>
                )}
            </Menu>
        </MainMenu>
    );
};

export default MenuBar;
