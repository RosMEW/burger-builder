import React from 'react';
import { connect, DispatchProp } from 'react-redux';

import Burger from './Burger/Burger';
import Controller from './Controller/Controller';
import { burgerBuilderState } from '../store/reducers/burgerBuilderReducer';

type burgerBuilderProps = {
    price: number;
    onIngredientAdded: (ing: string) => void;
    onIngredientRemoved: (ing: string) => void;
};

const BurgerBuilder = (props: burgerBuilderProps) => {
    return (
        <React.Fragment>
            <Burger />
            <Controller
                price={props.price}
                ingredientAdded={props.onIngredientAdded}
                ingredientRemoved={props.onIngredientRemoved}
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

const mapDispatchToProps = (dispatch: any) => {
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
