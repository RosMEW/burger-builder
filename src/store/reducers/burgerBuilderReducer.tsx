type action = {
    type: string;
    ingName: ingredientNames;
};

type initAction = {
    type: string;
    ingredients: ingredients;
};

export type ingredientNames = 'meat' | 'cheese' | 'bacon' | 'salad';

export type ingredients = {
    salad: number;
    cheese: number;
    meat: number;
    bacon: number;
};

export type burgerBuilderState = {
    ingredients: ingredients;
    totalPrice: number;
    error: boolean;
    building: boolean;
};

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 0,
    error: false,
    building: false
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
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName],
        building: true
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

const setIngredients = (state: burgerBuilderState, action: initAction) => {
    return {
        ...state,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 3.5,
        error: false,
        building: false
    };
};

const fetchIngredientsFailed = (state: burgerBuilderState) => {
    return {
        ...state,
        error: true
    };
};

export const burgerBuilderReducer = (
    state = initialState,
    action: action | initAction
) => {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return addIngredient(state, action as action);
        case 'REMOVE_INGREDIENT':
            return removeIngredient(state, action as action);
        case 'SET_INGREDIENTS':
            return setIngredients(state, action as initAction);
        case 'FETCH_INGREDIENTS_FAILED':
            return fetchIngredientsFailed(state);
        default:
            return state;
    }
};
