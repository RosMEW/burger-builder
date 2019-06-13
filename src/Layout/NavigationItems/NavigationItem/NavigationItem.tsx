import React from 'react';

import './NavigationItem.scss';

const NavigationItem = (props: any) => (
    <li className='navigation-item'>
        <a href='/'>{props.children}</a>
    </li>
);

export default NavigationItem;
