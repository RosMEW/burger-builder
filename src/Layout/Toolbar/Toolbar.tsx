import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import './Toolbar.scss';

const Toolbar = () => (
    <header className='toolbar'>
        <div className='toolbar__logo'>
            <img src='img/burger-logo.png' alt='burger-logo' />
        </div>
        <nav className='toolbar__nav'>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;
