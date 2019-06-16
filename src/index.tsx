import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { burgerBuilderReducer } from './store/reducers/burgerBuilderReducer';
import { ordersReducer } from './store/reducers/ordersReducer';
import { authReducer } from './store/reducers/authReducer';

import './index.scss';
import App from './App';

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer as any,
    orders: ordersReducer as any,
    auth: authReducer as any
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
