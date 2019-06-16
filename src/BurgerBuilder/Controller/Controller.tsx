import React from 'react';
import { reduce } from 'lodash';

import {
    ingredients,
    ingredientNames
} from '../../store/reducers/burgerBuilderReducer';
import './Controller.scss';
import { connect } from 'react-redux';
import { authState } from '../../store/reducers/authReducer';

type controllerProps = {
    price: number;
    ingredients: ingredients;
    ingredientRemoved: (option: string) => void;
    ingredientAdded: (option: string) => void;
    ordered: () => void;
    isAuthenticated: boolean;
};

const orderOptions: ingredientNames[] = ['meat', 'cheese', 'bacon', 'salad'];

const Controller = (props: controllerProps) => {
    const ingsQuantity = reduce(
        props.ingredients,
        (sum, value) => sum + value,
        0
    );

    const hasIngredient = ingsQuantity > 0;

    return (
        <div className='controller'>
            <p>
                Current Price<span>$ {props.price.toFixed(2)}</span>
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
                            onClick={() => props.ingredientAdded(option)}
                            disabled={ingsQuantity >= 6}>
                            More
                        </button>
                    </div>
                ))}
            </div>
            <button
                className='controller__button'
                disabled={!hasIngredient}
                onClick={props.ordered}>
                {props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
            </button>
        </div>
    );
};

const mapStateToProps = (state: { auth: authState }) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Controller);
