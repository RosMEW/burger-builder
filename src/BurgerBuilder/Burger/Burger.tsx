import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.scss';

const Burger = () => {
    return (
        <div className='Burger'>
            <BurgerIngredient ingredient='bread-top' />
            <BurgerIngredient ingredient='meat' />
            <BurgerIngredient ingredient='cheese' />
            <BurgerIngredient ingredient='bacon' />
            <BurgerIngredient ingredient='salad' />
            <BurgerIngredient ingredient='bread-bottom' />
        </div>
    );
};

export default Burger;
