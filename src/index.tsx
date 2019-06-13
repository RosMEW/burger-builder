import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { burgerBuilderReducer } from './store/reducers/burgerBuilderReducer';
import './index.scss';
import App from './App';

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
