import { useState } from 'react';
import { Menu as MainMenu } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';

const MenuBar = () => {
    const location = useLocation();
    const { pathname } = location;
    const path = pathname === '/' ? 'home' : pathname.split('/')[1];
    const [activeItem, setActiveItem] = useState(path);
    const { Item, Menu } = MainMenu;

    const itemOnClickHandler = value => {
        const { name } = value;
        return setActiveItem(name);
    };

    return (
        <MainMenu pointing secondary size="massive" color="teal">
            <Item
                name="home"
                active={activeItem === 'home'}
                onClick={itemOnClickHandler}
                as={Link}
                to="/"
            />
            <Menu position="right">
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
            </Menu>
        </MainMenu>
    );
};

export default MenuBar;
