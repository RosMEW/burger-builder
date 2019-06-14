import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.scss';

type navigationItem = {
    link: string;
    children: ReactNode;
    exact?: boolean;
};

const NavigationItem = (props: navigationItem) => (
    <li className='navigation-item'>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName='navigation-item--active'>
            {props.children}
        </NavLink>
    </li>
);

export default NavigationItem;
