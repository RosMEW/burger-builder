import React from 'react';

import './Backdrop.scss';

type backdrop = {
    showBackdrop: boolean;
    clicked: () => void;
};

const Backdrop = (props: backdrop) =>
    props.showBackdrop ? (
        <div className='backdrop' onClick={props.clicked} />
    ) : null;

export default Backdrop;
