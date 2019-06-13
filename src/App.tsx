import React from 'react';

import Toolbar from './Layout/Toolbar/Toolbar';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import './App.scss';

const App = () => {
    return (
        <div className='container'>
            <Toolbar />
            <main>
                <BurgerBuilder />
            </main>
        </div>
    );
};

export default App;
