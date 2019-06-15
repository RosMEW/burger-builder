import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import Toolbar from './Layout/Toolbar/Toolbar';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import './App.scss';

const Checkout = React.lazy(() => import('./Checkout/Checkout'));

const App = () => {
    let routes = (
        <Switch>
            <Route path='/checkout' render={props => <Checkout {...props} />} />
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
