import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.scss';

const NavigationItems = () => (
    <ul className='navigation-items'>
        <NavigationItem>Burger Builder</NavigationItem>
        <NavigationItem>Orders</NavigationItem>
        <NavigationItem>Authenticate</NavigationItem>
    </ul>
);

export default NavigationItems;
