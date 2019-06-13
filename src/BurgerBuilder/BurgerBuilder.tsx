import React from 'react';

import Burger from './Burger/Burger';

const BurgerBuilder = () => {
    return (
        <React.Fragment>
            <Burger />
            <div className='control' />
        </React.Fragment>
    );
};

export default BurgerBuilder;
