import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Burger from '../BurgerBuilder/Burger/Burger';
import Button from '../UI/Button/Button';
import {
    burgerBuilderState,
    ingredients
} from '../store/reducers/burgerBuilderReducer';
import { RouterProps } from 'react-router';
import './Checkout.scss';

type checkout = {
    ingredients: ingredients;
} & RouterProps;

const Checkout = (props: checkout) => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    return (
        <div>
            {props.ingredients ? (
                <div className='checkout'>
                    <h1>We hope it tastes well!</h1>
                    <div className='checkout__burger'>
                        <Burger ingredients={props.ingredients} />
                    </div>
                    <div className='checkout__buttons'>
                        <Button
                            btnText='CANCEL'
                            btnType='Danger'
                            onClick={checkoutCancelledHandler}
                        />
                        <Button
                            btnText='CONTINUE'
                            btnType='Success'
                            onClick={checkoutContinuedHandler}
                        />
                    </div>
                </div>
            ) : (
                <Redirect to='/' />
            )}
        </div>
    );
};

const mapStateToProps = (state: { burgerBuilder: burgerBuilderState }) => {
    return {
        ingredients: state.burgerBuilder.ingredients
    };
};
export default connect(mapStateToProps)(Checkout);
