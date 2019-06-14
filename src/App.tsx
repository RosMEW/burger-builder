import React from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import Toolbar from './Layout/Toolbar/Toolbar';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import './App.scss';

const App = () => {
    let routes = (
        <Switch>
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
        </Switch>
    );

    return (
        <div className='container'>
            <Toolbar />
            <main>{routes}</main>
        </div>
    );
};

export default withRouter(App);
