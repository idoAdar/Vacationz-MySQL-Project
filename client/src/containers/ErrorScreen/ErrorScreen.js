import React from 'react';
import { useSelector } from 'react-redux';

import './ErrorScreen.css';

const ErrorScreen = () => {
    const note = useSelector(state => state.userReducer.note);

    return (
        <div className={'error-container'}>
            <h3>Somthing went worng, please check your address once again</h3>
            <p>{note}</p>
            <small>For more help please call +972-054-720-2002</small>
        </div>
    )
}

export default ErrorScreen;