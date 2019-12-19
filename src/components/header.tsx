import React from 'react';
import logo from '../logo.svg';

const Header: React.FC = () => {
    return (
        <header>
            <img src={logo} alt='logo' className='App-logo'/>
        </header>
    );
};

export default Header;