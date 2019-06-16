import React, { useEffect } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { map } from 'lodash';
import Spinner from '../UI/Spinner/Spinner';
import { fetchOrders } from '../store/actions/orders';
import { ordersState, orderData } from '../store/reducers/ordersReducer';
import { authState } from '../store/reducers/authReducer';

type orders = {
    onFetchOrders: (token: string, userId: string) => void;
    orders: [];
    loading: boolean;
    token: string;
    userId: string;
    error: string;
};

const Orders = (props: orders) => {
    useEffect(() => {
        props.onFetchOrders(props.token, props.userId);
        // eslint-disable-next-line
    }, []);

    return (
        <div className='orders'>
            {props.loading ? (
                <Spinner />
            ) : (
                props.orders.map((order: orderData) => (
                    <div className='order' key={order.id}>
                        <p>
                            Ingredients:{' '}
                            {map(order.ingredients, (val, key) => (
                                <span key={key}>
                                    {key} {val}
                                </span>
                            ))}
                        </p>
                        <p>
                            Price: <strong>CAD {order.price.toFixed(2)}</strong>
                        </p>
                    </div>
                ))
            )}
            {props.error ? alert(props.error) : null}
        </div>
    );
};

const mapStateToProps = (state: { orders: ordersState; auth: authState }) => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        error: state.orders.error,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch: DispatchProp['dispatch']) => {
    return {
        onFetchOrders: (token: string, userId: string) =>
            dispatch(fetchOrders(token, userId) as any)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Orders);
