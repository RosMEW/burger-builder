import React from 'react';

import Toolbar from './Layout/Toolbar/Toolbar';
import './App.scss';

const App = () => {
    return (
        <div className='container'>
            <Toolbar />
            <main />
        </div>
    );
};

export default App;
