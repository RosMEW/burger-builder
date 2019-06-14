import React, { ReactNode } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import './Modal.scss';

type modal = {
    show: boolean;
    modalClosed: () => void;
    children: ReactNode;
};

const Modal = (props: modal) => (
    <React.Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div className={props.show ? 'modal modal--show' : 'modal modal--hide'}>
            {props.children}
        </div>
    </React.Fragment>
);

export default React.memo(Modal);
