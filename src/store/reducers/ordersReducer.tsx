import { ingredients } from './burgerBuilderReducer';
import { Dictionary } from 'lodash';

export type ordersState = {
    orders: [];
    loading: boolean;
    purchased: boolean;
    error: string;
};

const initialState = {
    orders: [] as any,
    loading: false,
    purchased: false,
    error: null
};

type action = {
    type: string;
    orderData: orderData;
    orderId?: string;
    orders?: [];
    error?: string;
};

export type orderData = {
    ingredients: ingredients;
    price: number;
    orderData: Dictionary<string>;
    id?: string;
};

export const ordersReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case 'PURCHASE_INIT':
            return { ...state, purchased: false, error: null };

        case 'PURCHASE_BURGER_START':
            return { ...state, loading: true };
        case 'PURCHASE_BURGER_SUCCESS':
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat({
                    ...action.orderData,
                    id: action.orderId
                })
            };
        case 'PURCHASE_BURGER_FAIL':
            return { ...state, loading: false, error: action.error };

        case 'FETCH_ORDERS_START':
            return { ...state, loading: true };
        case 'FETCH_ORDERS_SUCCESS':
            return { ...state, loading: false, orders: action.orders };
        case 'FETCH_ORDERS_FAIL':
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};
