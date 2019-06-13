type action = {
    type: string;
    ingName: 'meat' | 'cheese' | 'bacon' | 'salad';
};

export type ingredients = {
    salad: number;
    cheese: number;
    meat: number;
    bacon: number;
};

export type burgerBuilderState = {
    ingredients: ingredients;
    totalPrice: number;
};

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 3.5
};

const INGREDIENT_PRICES = {
    salad: 0.6,
    cheese: 1,
    meat: 1.2,
    bacon: 0.8
};

const addIngredient = (state: burgerBuilderState, action: action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingName]: state.ingredients[action.ingName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName]
    };
};

const removeIngredient = (state: burgerBuilderState, action: action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingName]: state.ingredients[action.ingName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingName]
    };
};

export const burgerBuilderReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return addIngredient(state, action);
        case 'REMOVE_INGREDIENT':
            return removeIngredient(state, action);
        default:
            return state;
    }
};
