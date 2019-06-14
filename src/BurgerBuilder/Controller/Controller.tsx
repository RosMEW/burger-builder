import React from 'react';

import {
    ingredients,
    ingredientNames
} from '../../store/reducers/burgerBuilderReducer';
import './Controller.scss';

type controllerProps = {
    price: number;
    ingredients: ingredients;
    ingredientRemoved: (option: string) => void;
    ingredientAdded: (option: string) => void;
};

const orderOptions: ingredientNames[] = ['meat', 'cheese', 'bacon', 'salad'];

const Controller = (props: controllerProps) => {
    const hasIngredient = (ings: ingredients) => {
        const sum = (Object.keys(ings) as ingredientNames[]).reduce(
            (sum, igKey) => sum + ings[igKey],
            0
        );
        return sum > 0;
    };
    return (
        <div className='controller'>
            <p>
                Current Price($): <strong>{props.price.toFixed(2)}</strong>
            </p>
            <div className='controller__options'>
                {orderOptions.map(option => (
                    <div className='option' key={option}>
                        <div className='option__label'>{option}</div>
                        <button
                            className='option__less'
                            onClick={() => props.ingredientRemoved(option)}
                            disabled={props.ingredients[option] <= 0}>
                            Less
                        </button>
                        <button
                            className='option__more'
                            onClick={() => props.ingredientAdded(option)}>
                            More
                        </button>
                    </div>
                ))}
            </div>
            <button
                className='controller__button'
                disabled={!hasIngredient(props.ingredients)}>
                ORDER NOW
            </button>
        </div>
    );
};

export default Controller;
