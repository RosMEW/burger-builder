import React, { useState, useEffect } from 'react';
import { connect, DispatchProp } from 'react-redux';

import Burger from './Burger/Burger';
import Controller from './Controller/Controller';
import Modal from '../UI/Modal/Modal';
import OrderSummary from './OrderSummary/OrderSummary';

import Spinner from '../UI/Spinner/Spinner';
import { initIngredients } from '../store/actions/burgerBuilder';
import {
    burgerBuilderState,
    ingredients
} from '../store/reducers/burgerBuilderReducer';
import { RouterProps } from 'react-router';

type burgerBuilderProps = {
    price: number;
    ingredients: ingredients;
    onIngredientAdded: (ing: string) => void;
    onIngredientRemoved: (ing: string) => void;
    onInitIngredients: () => void;
    onInitPurchase: () => void;
    error: boolean;
} & RouterProps;

const BurgerBuilder = (props: burgerBuilderProps) => {
    const [purchasing, setPurchasing] = useState(false);

    const {
        onInitIngredients,
        onIngredientRemoved,
        onIngredientAdded,
        onInitPurchase
    } = props;

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const purchaseHandler = () => {
        setPurchasing(true);
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    };

    let orderSummary = null;
    let burger = props.error ? (
        <p>Error: Ingredients cannot be loaded.</p>
    ) : (
        <Spinner />
    );

    if (props.ingredients) {
        orderSummary = (
            <OrderSummary
                ingredients={props.ingredients}
                price={props.price}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
            />
        );
        burger = (
            <React.Fragment>
                <Burger ingredients={props.ingredients} />
                <Controller
                    price={props.price}
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    ingredients={props.ingredients}
                    ordered={purchaseHandler}
                />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );
};

const mapStateToProps = (state: { burgerBuilder: burgerBuilderState }) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = (dispatch: DispatchProp['dispatch']) => {
    return {
        onIngredientAdded: (ing: string) =>
            dispatch({ type: 'ADD_INGREDIENT', ingName: ing }),
        onIngredientRemoved: (ing: string) =>
            dispatch({ type: 'REMOVE_INGREDIENT', ingName: ing }),
        onInitIngredients: () => dispatch(initIngredients() as any),
        onInitPurchase: () => dispatch({ type: 'PURCHASE_INIT' })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BurgerBuilder);
