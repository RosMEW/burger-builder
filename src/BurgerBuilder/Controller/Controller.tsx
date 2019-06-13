import React from 'react';

import './Controller.scss';

const orderOptions = ['meat', 'cheese', 'bacon', 'salad'];

const Controller = () => {
    return (
        <div className='controller'>
            <p>
                Current Price($): <strong>0.00</strong>
            </p>
            <div className='controller__options'>
                {orderOptions.map(option => (
                    <div className='option' key={option}>
                        <div className='option__label'>{option}</div>
                        <button className='option__less'>Less</button>
                        <button className='option__more'>More</button>
                    </div>
                ))}
            </div>
            <button className='controller__button'>ORDER NOW</button>
        </div>
    );
};

export default Controller;
