import React, { useState } from 'react';
import { connect, DispatchProp } from 'react-redux';

import Burger from './Burger/Burger';
import Controller from './Controller/Controller';
import Modal from '../UI/Modal/Modal';
import OrderSummary from './OrderSummary/OrderSummary';
import {
    burgerBuilderState,
    ingredients
} from '../store/reducers/burgerBuilderReducer';

type burgerBuilderProps = {
    price: number;
    onIngredientAdded: (ing: string) => void;
    onIngredientRemoved: (ing: string) => void;
    ingredients: ingredients;
};

const BurgerBuilder = (props: burgerBuilderProps) => {
    const [purchasing, setPurchasing] = useState(false);

    const purchaseHandler = () => {
        setPurchasing(true);
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        // props.onInitPurchase();
        // props.history.push('/checkout');
    };

    return (
        <React.Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {props.ingredients ? (
                    <OrderSummary
                        ingredients={props.ingredients}
                        price={props.price}
                        purchaseCancelled={purchaseCancelHandler}
                        purchaseContinued={purchaseContinueHandler}
                    />
                ) : null}
            </Modal>
            <Burger ingredients={props.ingredients} />
            <Controller
                price={props.price}
                ingredientAdded={props.onIngredientAdded}
                ingredientRemoved={props.onIngredientRemoved}
                ingredients={props.ingredients}
                ordered={purchaseHandler}
            />
        </React.Fragment>
    );
};

const mapStateToProps = (state: { burgerBuilder: burgerBuilderState }) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    };
};

const mapDispatchToProps = (dispatch: DispatchProp['dispatch']) => {
    return {
        onIngredientAdded: (ing: string) =>
            dispatch({ type: 'ADD_INGREDIENT', ingName: ing }),
        onIngredientRemoved: (ing: string) =>
            dispatch({ type: 'REMOVE_INGREDIENT', ingName: ing })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BurgerBuilder);
