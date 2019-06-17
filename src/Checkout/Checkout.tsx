import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps, Switch } from 'react-router';

import Burger from '../BurgerBuilder/Burger/Burger';
import ContactData from './ContactData/ContactData';
import Button from '../UI/Button/Button';

import {
    burgerBuilderState,
    ingredients
} from '../store/reducers/burgerBuilderReducer';
import { ordersState } from '../store/reducers/ordersReducer';
import './Checkout.scss';

type checkout = {
    ingredients: ingredients;
    purchased: boolean;
} & RouteComponentProps;

const Checkout = (props: checkout) => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    const checkout = (
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
    );

    return (
        <div>
            {props.purchased ? <Redirect to='/orders' /> : null}
            {props.ingredients ? (
                <Switch>
                    <Route
                        path={props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                    <Route path='/' render={() => checkout} />
                </Switch>
            ) : (
                <Redirect to='/' />
            )}
        </div>
    );
};

const mapStateToProps = (state: {
    burgerBuilder: burgerBuilderState;
    orders: ordersState;
}) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
    };
};
export default connect(mapStateToProps)(Checkout);
