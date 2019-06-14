import React from 'react';

import Backdrop from '../Backdrop/Backdrop';

type modal = {
    showBackdrop: boolean;
    modalClosed: () => void;
};

const Modal = (props: modal) => (
    <React.Fragment>
        <Backdrop
            showBackdrop={props.showBackdrop}
            clicked={props.modalClosed}
        />
        <div className='modal'>children</div>
    </React.Fragment>
);

export default Modal;
