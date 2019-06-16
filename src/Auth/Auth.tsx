import React, { useState, useEffect } from 'react';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import { checkValidity } from '../Checkout/ContactData/checkValidity';
import { Dictionary, reduce } from 'lodash';
import './Auth.scss';
import { authState } from '../store/reducers/authReducer';
import { burgerBuilderState } from '../store/reducers/burgerBuilderReducer';
import { auth } from '../store/actions/auth';
import { DispatchProp, connect } from 'react-redux';
import { Redirect, RouterProps } from 'react-router';

type auth = {
    isAuthenticated: boolean;
    authRedirectPath: string;
    error: any;
    loading: boolean;
    onAuth: (email: string, password: string, isSignup: boolean) => void;
    buildingBurger: boolean;
    onSetAuthRedirectPath: () => void;
} & RouterProps;

type inputValidation = {
    validation: any;
    valid: boolean;
    touched: boolean;
    value: string;
};

type authForm = Dictionary<inputValidation>;

const Auth = (props: auth) => {
    const [isSignup, setIsSignup] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);
    const [authForm, setAuthForm] = useState<authForm>({
        email: {
            validation: {
                isEmail: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        password: {
            validation: {
                minLength: 8,
                maxLength: 12
            },
            valid: false,
            touched: false,
            value: ''
        }
    });

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputType = event.target.attributes.getNamedItem('name');
        if (!inputType) return;
        const updatedInput = {
            valid: checkValidity(
                event.target.value,
                authForm[inputType.value].validation
            ),
            touched: true,
            value: event.target.value
        };
        setAuthForm({
            ...authForm,
            [inputType.value]: {
                ...authForm[inputType.value],
                ...updatedInput
            }
        });
    };

    useEffect(() => {
        const checkFormValidity = () =>
            reduce(authForm, (acc, val) => val.valid && acc, true);
        setIsFormValid(checkFormValidity());
    }, [authForm]);

    const classNameInvalid = (inputType: string) => {
        if (!authForm[inputType].valid && authForm[inputType].touched)
            return 'inputInvalid';
        return '';
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    };

    let redirect = props.isAuthenticated ? <Redirect to='/' /> : null;
    if (props.buildingBurger && props.isAuthenticated)
        redirect = <Redirect to='/checkout' />;

    return (
        <div className='auth'>
            {redirect}
            {props.error ? <h5>{props.error.message}</h5> : null}
            <form onSubmit={submitHandler}>
                {props.loading ? (
                    <Spinner />
                ) : (
                    <React.Fragment>
                        <input
                            type='email'
                            name='email'
                            placeholder='Your E-Mail'
                            onChange={inputHandler}
                            className={classNameInvalid('email')}
                            required
                        />
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            onChange={inputHandler}
                            className={classNameInvalid('password')}
                            required
                        />
                    </React.Fragment>
                )}
                <div className='authButton'>
                    <Button
                        btnText='SUBMIT'
                        btnType='Success'
                        disabled={!isFormValid}
                    />
                </div>
            </form>
            <div className='authButton'>
                <Button
                    btnText={
                        isSignup ? 'SWITCH TO SIGN IN' : 'SWITCH TO SIGN UP'
                    }
                    btnType='Danger'
                    onClick={() => setIsSignup(!isSignup)}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state: {
    auth: authState;
    burgerBuilder: burgerBuilderState;
}) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building
    };
};

const mapDispatchToProps = (dispatch: DispatchProp['dispatch']) => {
    return {
        onAuth: (email: string, password: string, isSignup: boolean) =>
            dispatch(auth(email, password, isSignup) as any)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);
