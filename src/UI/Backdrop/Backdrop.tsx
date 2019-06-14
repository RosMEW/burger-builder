import React from 'react';

import { CSSTransition } from 'react-transition-group';

import './Backdrop.scss';

type backdrop = {
    show: boolean;
    clicked: () => void;
};

const Backdrop = (props: backdrop) => (
    <CSSTransition
        in={props.show}
        timeout={500}
        unmountOnExit
        mountOnEnter
        classNames='backdrop'>
        <div className='backdrop' onClick={props.clicked} />
    </CSSTransition>
);

export default Backdrop;
