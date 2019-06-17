import React from 'react';
import { map, range, flatten } from 'lodash';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import {
    ingredients,
    ingredientNames
} from '../../store/reducers/burgerBuilderReducer';
import './Burger.scss';

const Burger = (props: { ingredients: ingredients }) => {
    let burgerIngs = map(props.ingredients, (val, ing: ingredientNames) =>
        range(val).map(i => <BurgerIngredient ingredient={ing} key={ing + i} />)
    );
    burgerIngs = flatten(burgerIngs);

    return (
        <div className='burger'>
            <BurgerIngredient ingredient='bread-top' />
            {burgerIngs.length === 0 ? (
                <p className='addIngredient'>
                    Please start adding ingredients!
                </p>
            ) : (
                burgerIngs
            )}
            <BurgerIngredient ingredient='bread-bottom' />
        </div>
    );
};

export default Burger;
