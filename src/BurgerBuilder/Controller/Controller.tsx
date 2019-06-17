import React from 'react';
import { reduce, map } from 'lodash';
import { connect } from 'react-redux';

import { ingredients } from '../../store/reducers/burgerBuilderReducer';
import { authState } from '../../store/reducers/authReducer';
import './Controller.scss';

type controllerProps = {
    price: number;
    ingredients: ingredients;
    isAuthenticated: boolean;
    ingredientRemoved: (option: string) => void;
    ingredientAdded: (option: string) => void;
    ordered: () => void;
};

const Controller = (props: controllerProps) => {
    const ingsQuantity = reduce(
        props.ingredients,
        (sum, value) => sum + value,
        0
    );

    return (
        <div className='controller--container'>
            <div className='controller'>
                <p>
                    Current Price<span>$ {props.price.toFixed(2)}</span>
                </p>
                <div className='controller__options'>
                    {map(props.ingredients, (val, key) => (
                        <div className='option' key={key}>
                            <div className='option__label'>{key}</div>
                            <button
                                className='option__less'
                                onClick={() => props.ingredientRemoved(key)}
                                disabled={val <= 0}>
                                Less
                            </button>
                            <button
                                className='option__more'
                                onClick={() => props.ingredientAdded(key)}
                                disabled={ingsQuantity >= 8}>
                                More
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    className='controller__button'
                    disabled={ingsQuantity > 0 ? false : true}
                    onClick={props.ordered}>
                    {props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state: { auth: authState }) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Controller);
