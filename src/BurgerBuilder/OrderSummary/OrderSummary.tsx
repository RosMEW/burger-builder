import React from 'react';
import { map } from 'lodash';

import Button from '../../UI/Button/Button';

import { ingredients } from '../../store/reducers/burgerBuilderReducer';
import './OrderSummary.scss';

type orderSummary = {
    ingredients: ingredients;
    price: number;
    purchaseCancelled: () => void;
    purchaseContinued: () => void;
};

const OrderSummary = (props: orderSummary) => {
    const ingsSummary = map(props.ingredients, (val, ing) => (
        <li key={ing}>
            <span>{ing}</span> {val}
        </li>
    ));

    return (
        <div className='orderSummary'>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>{ingsSummary}</ul>
            <p>
                <strong>
                    <span>Total Price</span> $ {props.price.toFixed(2)}
                </strong>
            </p>
            <p>Continue to Checkout?</p>
            <div className='orderSummary__buttons'>
                <Button
                    btnText='CANCEL'
                    btnType='Danger'
                    onClick={props.purchaseCancelled}
                />
                <Button
                    btnText='CONTINUE'
                    btnType='Success'
                    onClick={props.purchaseContinued}
                />
            </div>
        </div>
    );
};
export default OrderSummary;
