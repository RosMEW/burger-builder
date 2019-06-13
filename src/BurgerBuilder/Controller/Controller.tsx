import React from 'react';

import './Controller.scss';

type controllerProps = {
    price: number;
    ingredientRemoved: (option: string) => void;
    ingredientAdded: (option: string) => void;
};

const orderOptions = ['meat', 'cheese', 'bacon', 'salad'];

const Controller = (props: controllerProps) => {
    return (
        <div className='controller'>
            <p>
                Current Price($): <strong>{props.price.toFixed(2)}</strong>
            </p>
            <div className='controller__options'>
                {orderOptions.map(option => (
                    <div className='option' key={option}>
                        <div className='option__label'>{option}</div>
                        <button
                            className='option__less'
                            onClick={() => props.ingredientRemoved(option)}>
                            Less
                        </button>
                        <button
                            className='option__more'
                            onClick={() => props.ingredientAdded(option)}>
                            More
                        </button>
                    </div>
                ))}
            </div>
            <button className='controller__button'>ORDER NOW</button>
        </div>
    );
};

export default Controller;
