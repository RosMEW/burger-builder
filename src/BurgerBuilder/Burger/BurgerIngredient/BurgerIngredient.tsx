import React from 'react';

import './BurgerIngredient.scss';

type BurgerIngredient = {
    ingredient:
        | 'bread-top'
        | 'bread-bottom'
        | 'meat'
        | 'cheese'
        | 'bacon'
        | 'salad';
};

const BurgerIngredient = (props: BurgerIngredient) =>
    props.ingredient === 'bread-top' ? (
        <div className='bread-top'>
            <div className='seed1' />
            <div className='seed2' />
        </div>
    ) : (
        <div className={props.ingredient} />
    );

export default BurgerIngredient;
