import React, { useState, useEffect } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouterProps } from 'react-router';
import { Dictionary, reduce } from 'lodash';

import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import { checkValidity } from './checkValidity';

import { purchaseBurger } from '../../store/actions/orders';
import {
    burgerBuilderState,
    ingredients
} from '../../store/reducers/burgerBuilderReducer';
import { ordersState, orderData } from '../../store/reducers/ordersReducer';
import { authState } from '../../store/reducers/authReducer';
import './ContactData.scss';

type inputValidation = {
    validation?: any;
    valid: boolean;
    touched: boolean;
    value: string;
};

type formValidation = Dictionary<inputValidation>;

type contactData = {
    ingredients: ingredients;
    price: number;
    loading: boolean;
    error: string;
    token: string;
    userId: string;
    onInitPurchase: () => void;
    onOrderBurger: (orderData: orderData, token: string) => void;
} & RouterProps;

const ContactData = (props: contactData) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [formValidation, setFormValidation] = useState<formValidation>({
        name: {
            validation: {
                isString: false
            },
            valid: false,
            touched: false,
            value: ''
        },
        address: {
            valid: true,
            touched: false,
            value: ''
        },
        postalCode: {
            validation: {
                minLength: 6,
                maxLength: 6
            },
            valid: false,
            touched: false,
            value: ''
        },
        tel: {
            validation: {
                isNumber: true,
                minLength: 10,
                maxLength: 10
            },
            valid: false,
            touched: false,
            value: ''
        }
    });

    useEffect(() => {
        const checkFormValidity = () =>
            reduce(formValidation, (acc, val) => val.valid && acc, true);

        setFormIsValid(checkFormValidity());
    }, [formValidation]);

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputType = event.target.attributes.getNamedItem('name');
        if (!inputType) return;

        const updatedInput = {
            valid: checkValidity(
                event.target.value,
                formValidation[inputType.value].validation
            ),
            touched: true,
            value: event.target.value
        };
        setFormValidation({
            ...formValidation,
            [inputType.value]: {
                ...formValidation[inputType.value],
                ...updatedInput
            }
        });
    };

    const classNameInvalid = (inputType: string) => {
        if (
            !formValidation[inputType].valid &&
            formValidation[inputType].touched
        )
            return 'inputInvalid';
        return '';
    };

    const orderHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = reduce(
            formValidation,
            (acc, val, key) => ({ ...acc, [key]: val.value }),
            {}
        );

        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };

        props.onOrderBurger(order, props.token);
    };

    const purchaseFail = () => {
        props.onInitPurchase();
        alert(props.error);
        props.history.push('/');
    };

    const form = (
        <form onSubmit={orderHandler}>
            <input
                type='text'
                name='name'
                placeholder='Your Name'
                onChange={inputHandler}
                className={classNameInvalid('name')}
                required
            />
            <input
                type='text'
                name='address'
                placeholder='Address'
                onChange={inputHandler}
                required
            />
            <input
                type='text'
                name='postalCode'
                placeholder='Postal Code'
                onChange={inputHandler}
                className={classNameInvalid('postalCode')}
                required
            />
            <input
                type='text'
                name='tel'
                placeholder='Phone Number'
                onChange={inputHandler}
                className={classNameInvalid('tel')}
                required
            />
            <div className='formButton'>
                <Button
                    btnText='ORDER'
                    disabled={!formIsValid}
                    btnType='Success'
                />
            </div>
        </form>
    );

    return (
        <React.Fragment>
            {props.error ? purchaseFail() : null}
            <div className='contact-data'>
                <h4>Enter your Contact Data</h4>
                {props.loading ? <Spinner /> : form}
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: {
    burgerBuilder: burgerBuilderState;
    orders: ordersState;
    auth: authState;
}) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading,
        error: state.orders.error,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch: DispatchProp['dispatch']) => {
    return {
        onOrderBurger: (orderData: orderData, token: string) =>
            dispatch(purchaseBurger(orderData, token) as any),
        onInitPurchase: () => dispatch({ type: 'PURCHASE_INIT' })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactData);
