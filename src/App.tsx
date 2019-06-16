import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import Toolbar from './Layout/Toolbar/Toolbar';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import './App.scss';

const Checkout = React.lazy(() => import('./Checkout/Checkout'));
const Orders = React.lazy(() => import('./Orders/Orders'));
const Auth = React.lazy(() => import('./Auth/Auth'));

const App = () => {
    let routes = (
        <Switch>
            <Route path='/checkout' render={props => <Checkout {...props} />} />
            <Route
                path='/orders'
                render={props => <Orders {...props as any} />}
            />
            <Route path='/auth' render={props => <Auth {...props as any} />} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
        </Switch>
    );

    return (
        <div className='container'>
            <Toolbar />
            <main>
                <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
            </main>
        </div>
    );
};

export default withRouter(App);
