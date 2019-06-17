import axios from '../../axios';
import { DispatchProp } from 'react-redux';
import { reduce } from 'lodash';
// eslint-disable-next-line
import { orderData } from '../reducers/ordersReducer';

export const purchaseBurger = (orderData: orderData, token: string) => {
    return (dispatch: DispatchProp['dispatch']) => {
        dispatch({ type: 'PURCHASE_BURGER_START' });
        axios
            .post('/orders.json?auth=' + token, orderData)
            .then(response =>
                dispatch({
                    type: 'PURCHASE_BURGER_SUCCESS',
                    orderId: response.data.name,
                    orderData: orderData
                })
            )
            .catch(error => {
                dispatch({ type: 'PURCHASE_BURGER_FAIL', error: error });
            });
    };
};

export const fetchOrders = (token: string, userId: string) => {
    return (dispatch: DispatchProp['dispatch']) => {
        dispatch({ type: 'FETCH_ORDERS_START' });
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios
            .get('/orders.json' + queryParams)
            .then(response => {
                const fetchedOrders = reduce(
                    response.data,
                    (acc, val, key) => acc.concat({ ...val, id: key }),
                    []
                );
                dispatch({
                    type: 'FETCH_ORDERS_SUCCESS',
                    orders: fetchedOrders
                });
            })
            .catch(error =>
                dispatch({ type: 'FETCH_ORDERS_FAIL', error: error })
            );
    };
};
