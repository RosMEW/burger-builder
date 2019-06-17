import axios from 'axios';
import { DispatchProp } from 'react-redux';

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return { type: 'AUTH_LOGOUT' };
};

export const checkAuthTimeout = (expirationTime: number) => {
    return (dispatch: DispatchProp['dispatch']) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email: string, password: string, isSignup: boolean) => {
    return (dispatch: DispatchProp['dispatch']) => {
        dispatch({ type: 'AUTH_START' });
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url =
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDAu5-xEEbtH84Nu0YHE1s_sJPPy3wveWs';

        if (!isSignup)
            url =
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDAu5-xEEbtH84Nu0YHE1s_sJPPy3wveWs';
        axios
            .post(url, authData)
            .then(response => {
                const expirationDate = new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                );
                localStorage.setItem('expirationDate', expirationDate as any);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                dispatch({
                    type: 'AUTH_SUCCESS',
                    token: response.data.idToken,
                    userId: response.data.localId
                });

                dispatch(checkAuthTimeout(response.data.expiresIn) as any);
            })
            .catch(error => dispatch({ type: 'AUTH_FAIL', error: error }));
    };
};

export const setAuthRedirectPath = (path: string) => {
    return {
        type: 'SET_AUTH_REDIRECT_PATH',
        path: path
    };
};

export const authCheckState = () => {
    return (dispatch: DispatchProp['dispatch']) => {
        const token = localStorage.getItem('token');
        if (!token) dispatch(logout());
        else {
            const expirationDate = new Date(localStorage.getItem(
                'expirationDate'
            ) as any);
            if (expirationDate <= new Date()) dispatch(logout());
            else {
                const userId = localStorage.getItem('userId');
                dispatch({ type: 'AUTH_SUCCESS', token, userId });
                dispatch(checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                ) as any);
            }
        }
    };
};
