import React from 'react';

import Burger from './Burger/Burger';
import Controller from './Controller/Controller';

const BurgerBuilder = () => {
    return (
        <React.Fragment>
            <Burger />
            <Controller />
        </React.Fragment>
    );
};

export default BurgerBuilder;
