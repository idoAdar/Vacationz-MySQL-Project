import ReactDOM from 'react-dom';
import React, { Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';

const ModalOverlay = props => {
    const content = (
        <div className={'modal'}>
            <header className={'modal-header'}>
                <h3>{props.header}</h3>
                <i className="fas fa-exclamation-triangle fa-2x"></i>
            </header>
            <div className={'modal-body'}>
                {props.children}
            </div>
            <footer className={'modal-actions'}>
                <button onClick={() => props.delete()}>Remove</button>
                <button onClick={() => props.close()}>Cancel</button>
            </footer>
        </div>
    )
    return ReactDOM.createPortal(content, document.getElementById('modal'));
}

const Modal = props => {
    return (
        <Fragment>
            {props.show && <Backdrop/>}
            <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames={'modal'}>
                <ModalOverlay {...props}/>
            </CSSTransition>
        </Fragment>
    )
}

export default Modal;