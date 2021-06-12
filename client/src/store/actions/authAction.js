import axios from 'axios';
import { SIGN_UP,
    SIGN_UP_FAIL,
    LOGOUT,
    SET_SPINNER,
    CLEAR_NOTE } 
from '../actionTypes/actionTypes';
const database = 'http://localhost:5000';

export const register = (state, history) => async dispatch => {
    try {
        const response = await axios.post(`${database}/register`, state);
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({
            type: SIGN_UP,
            data: response.data
        })
        history.push('/');
    } catch (error) {
        dispatch({
            type: SIGN_UP_FAIL,
            data: error.response.data.message || error.message
        })
    }
}

export const login = (state, history) => async dispatch => {
    try {
        const response = await axios.post(`${database}/login`, state);
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({
            type: SIGN_UP,
            data: response.data
        })
        history.push('/');
    } catch (error) {
        dispatch({
            type: SIGN_UP_FAIL,
            data: error.response.data.message || error.message
        })
    }
}

export const googleLog = (email, history) => async dispatch => {
    try {
        const response = await axios.post(`${database}/google-login`, { email });
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({
            type: SIGN_UP,
            data: response.data
        })
        history.push('/');
    } catch (error) {
        dispatch({
            type: SIGN_UP_FAIL,
            data: error.response.data.message || error.message
        })
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('user');
    dispatch({
        type: LOGOUT
    })
    dispatch({
        type: CLEAR_NOTE
    })
}

export const uiSpinner = () => dispatch => {
    dispatch({
        type: SET_SPINNER
    })
}