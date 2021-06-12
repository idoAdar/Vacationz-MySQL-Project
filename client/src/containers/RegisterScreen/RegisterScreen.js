import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register, uiSpinner } from '../../store/actions/authAction';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import InputElement from '../../components/InputElement/InputElement';
import VectorImage from './6595.jpg';
import Spinner from '../../components/UIElemets/Spinner/Spinner';
import './RegisterScreen.css';

const RegisterScreen = props => {
    const isLoading = useSelector(state => state.authReducer.isLoading);
    const note = useSelector(state => state.authReducer.note);
    const dispatch = useDispatch();

    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
        agree: false
    });

    const { firstName, lastName, email, password, confirm, agree } = formState;

    const [errorState, setErrorState] = useState({
        fnameError: null,
        lnameError: null,
        emailError: null,
        passwordError: null,
        confimError: null
    });

    const updateState = e => {
        e.preventDefault();
        setFormState(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    };

    const validator = () => {
        let fnameErr = null; 
        let lnameErr = null;
        let emailErr = null;
        let passwordErr = null;
        let confiemErr = null;

        if (firstName.trim() === '') fnameErr = 'First name is require';
        if (lastName.trim() === '') lnameErr = 'Last name is require';
        if (email.trim() === '' || !email.includes('@')) emailErr = 'Valid email is required';
        if (password.length < 8) passwordErr = 'Password must be at least 8 characters long';
        if (password !== confirm || password.trim() === '') confiemErr = 'Password must be match';

        if (fnameErr || lnameErr || emailErr || passwordErr || confiemErr) {
            setErrorState(prevState => {
                return {
                    ...prevState,
                    fnameError: fnameErr,
                    lnameError: lnameErr,
                    emailError: emailErr,
                    passwordError: passwordErr,
                    confimError: confiemErr
                }
            })
            return false;
        }
        return true;
    };

    const registerUser = e => {
        e.preventDefault();
        const isValid = validator();
        if (isValid) {
            dispatch(uiSpinner());
            return dispatch(register(formState, props.history)); 
        }
    };

    let buttonStyle = { backgroundColor: '#a5a5a5' };
    if (agree) {
        buttonStyle = { backgroundColor: '#fa4033' };
    }

    // Framer Motion Animation:
    const pageTransition = {
        in: {
            opacity: 1,
            y: 0
        },
        out: {
            opacity: 0,
            y: '-100vh'
        }
    };

    return (
        <motion.div exit={'out'} animate={'in'} initial={'out'} variants={pageTransition}>
            <div className={'register-grid'}>
                <div className={'register-header'}>
                    <h1><i className="fas fa-sign-in-alt fa-lg"></i> Sign up</h1>
                    <small>{note}</small>
                </div>
                <form onSubmit={registerUser}>
                    <InputElement icon={'fas fa-user-circle'}
                        inputType={'text'}
                        holder={'First Name'}
                        name={'firstName'}
                        insertFunc={updateState}
                        error={errorState.fnameError}/>
                    <InputElement icon={'fas fa-user-tag'}
                        inputType={'text'}
                        holder={'Last Name'}
                        name={'lastName'}
                        insertFunc={updateState}
                        error={errorState.lnameError}/>
                    <InputElement icon={'fas fa-envelope'}
                        inputType={'email'}
                        holder={'Email'}
                        name={'email'}
                        insertFunc={updateState}
                        error={errorState.emailError}/>
                    <InputElement icon={'fas fa-unlock'}
                        inputType={'password'}
                        holder={'Password'}
                        name={'password'}
                        insertFunc={updateState}
                        error={errorState.passwordError}/>
                    <InputElement icon={'fas fa-key'}
                        inputType={'password'}
                        holder={'Repeat your password'}
                        name={'confirm'}
                        insertFunc={updateState}
                        error={errorState.confimError}/>
                    <InputElement inputType={'checkbox'}
                        insertFunc={(e) => setFormState(prevState => {
                            return {
                                ...prevState,
                                agree: e.target.checked
                            }
                        })}
                        name={'agree'}
                        lable={' I agree all statements in Terms of service'}/>               
                    <button type={'submit'}
                        style={buttonStyle}
                        disabled={agree ? false : true}
                    >Register</button>
                </form>
                <div className={'register-vector-image'}>
                    <img src={VectorImage} alt={'register-vector-icon'}/>
                    <p>Already have account? <Link to={'/login'}>Login</Link></p>
                </div>
            </div>
            {isLoading && <Spinner />}
        </motion.div>
    )
}

export default RegisterScreen;