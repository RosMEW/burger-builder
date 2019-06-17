import React, { Suspense, useEffect } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { DispatchProp, connect } from 'react-redux';

import Toolbar from './Layout/Toolbar/Toolbar';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';

import { authCheckState } from './store/actions/auth';
import { authState } from './store/reducers/authReducer';
import './App.scss';

const Checkout = React.lazy(() => import('./Checkout/Checkout'));
const Orders = React.lazy(() => import('./Orders/Orders'));
const Auth = React.lazy(() => import('./Auth/Auth'));
const Logout = React.lazy(() => import('./Auth/Logout'));

const App = (props: any) => {
    useEffect(() => {
        props.onTryAutoSignup();
        // eslint-disable-next-line
    }, []);

    let route = (
        <Switch>
            <Route path='/auth' render={props => <Auth {...props as any} />} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
        </Switch>
    );

    if (props.isAuthenticated)
        route = (
            <Switch>
                <Route
                    path='/checkout'
                    render={props => <Checkout {...props} />}
                />
                <Route
                    path='/orders'
                    render={props => <Orders {...props as any} />}
                />
                <Route path='/logout' component={Logout} />
                <Route
                    path='/auth'
                    render={props => <Auth {...props as any} />}
                />
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to='/' />
            </Switch>
        );

    return (
        <div className='container'>
            <Toolbar />
            <main>
                <Suspense fallback={<p />}>{route}</Suspense>
            </main>
        </div>
    );
};

const mapStateToProps = (state: { auth: authState }) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch: DispatchProp['dispatch']) => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState() as any)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));
