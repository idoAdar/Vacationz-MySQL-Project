import React from 'react';

import './InputElement.css';

const InputElement = props => {
    return (
        <div className={'inputElement'}>
            <i className={props.icon}></i>
            <input type={props.inputType}
                value={props.value}
                placeholder={props.holder} 
                name={props.name}
                onChange={props.insertFunc}
                step={.01}/>
            {props.lable ? (
                <label>{props.lable}</label>
            ) : (null)}
            <small>{props.error || ' '}</small>
        </div>
    )
}

export default InputElement;