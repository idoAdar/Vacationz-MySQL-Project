import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import { login, uiSpinner, googleLog } from '../../store/actions/authAction';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import InputElement from '../../components/InputElement/InputElement';
import VectorImage from './5257993.jpg';
import Spinner from '../../components/UIElemets/Spinner/Spinner';
import './LoginScreen.css';

const LoginScreen = props => {
    const isLoading = useSelector(state => state.authReducer.isLoading);
    const note = useSelector(state => state.authReducer.note);
    const dispatch = useDispatch();

    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formState;

    const [errorState, setErrorState] = useState({
        emailError: null,
        passwordError: null
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
        let emailErr = null;
        let passwordErr = null;

        if (email.trim() === '' || !email.includes('@')) emailErr = 'Valid email is required';
        if (password.length < 8) passwordErr = 'Password must be at least 8 characters long';

        if (emailErr || passwordErr) {
            setErrorState(prevState => {
                return {
                    ...prevState,
                    emailError: emailErr,
                    passwordError: passwordErr
                }
            })
            return false;
        }
        return true;
    };

    const loginUser = e => {
        e.preventDefault();
        const isValid = validator();
        if (isValid) {
            dispatch(uiSpinner());
            return dispatch(login(formState, props.history));
        }
    };

    const googleLogin = response => {
        if (response) {
            const googleEmail = response.profileObj.email;
            dispatch(googleLog(googleEmail, props.history));   
        }
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
            <div className={'login-grid'}>
                <div className={'login-header'}>
                    <h1><i className="fas fa-sign-in-alt fa-lg"></i> Login</h1>
                    <small>Admin: idoadar5@Gmail.com</small>
                    <small>Password: 123456789</small>
                    <small>{note}</small>
                </div>
                <form onSubmit={loginUser}>
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
                    <button type={'submit'}>Login</button>
                    <GoogleLogin 
                        clientId={'567128890391-mpfuhqm00pldjhnnie9hbnca0bosmg8p.apps.googleusercontent.com'}
                        buttonText={'Google Account'}
                        onSuccess={googleLogin}
                        onFailure={googleLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                </form>
                <div className={'login-vector-image'}>
                    <img src={VectorImage} alt={'login-vector-icon'}/>
                    <p>Don't have account yet? <Link to={'/register'}>Register</Link></p>
                </div>
            </div>
            {isLoading && <Spinner />}
        </motion.div>
    )
}

export default LoginScreen;