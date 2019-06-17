import React from 'react';

import './Button.scss';

type button = {
    disabled: boolean;
    btnType: 'Success' | 'Danger';
    onClick: () => void;
    btnText: string;
};

const Button = (props: button) => (
    <button
        className={props.btnType + ' Button'}
        onClick={props.onClick}
        disabled={props.disabled}>
        {props.btnText}
    </button>
);

export default Button;
