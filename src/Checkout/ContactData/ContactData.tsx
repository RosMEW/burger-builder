import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dictionary, reduce } from 'lodash';

import { checkValidity } from './checkValidity';
import Button from '../../UI/Button/Button';

import {
    burgerBuilderState,
    ingredients
} from '../../store/reducers/burgerBuilderReducer';
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
};

const ContactData = (props: contactData) => {
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
        email: {
            validation: {
                isEmail: true
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

    const [formIsValid, setFormIsValid] = useState(false);

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

        const orderInfo = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData
        };
    };

    let form = (
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
                type='email'
                name='email'
                placeholder='E-Mail'
                onChange={inputHandler}
                className={classNameInvalid('email')}
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
        <div className='contact-data'>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = (state: { burgerBuilder: burgerBuilderState }) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    };
};

export default connect(mapStateToProps)(ContactData);
