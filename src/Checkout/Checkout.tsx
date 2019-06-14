import React from 'react';
import { connect } from 'react-redux';

import {
    burgerBuilderState,
    ingredients
} from '../store/reducers/burgerBuilderReducer';

type checkout = {
    ingredients: ingredients;
};

const Checkout = (props: checkout) => {
    return <div />;
};

const mapStateToProps = (state: { burgerBuilder: burgerBuilderState }) => {
    return {
        ingredients: state.burgerBuilder.ingredients
    };
};
export default connect(mapStateToProps)(Checkout);
