import axios from 'axios';
import { GET_ALL_VACATIONS, 
    GET_USER_VACATIONS, 
    FOLLOW_VACATION,
    FOLLOW_VACATION_FAIL,
    REMOVE_FOLLOW_VACATION,
    REMOVE_FOLLOW_VACATION_FAIL,
    SERVER_ERROR } 
from '../actionTypes/actionTypes';
const database = 'http://localhost:5000';

export const allVacation = history => async dispatch => {
    try {
        const response = await axios.get(`${database}/users`);
        dispatch({
            type: GET_ALL_VACATIONS,
            data: response.data
        })  
    } catch (error) {
        dispatch({
            type: SERVER_ERROR,
            data: error.message
        })
        history.push('/error');
    }
}

export const userVacations = history => async dispatch => {    
    try {
        const response = await axios.get(`${database}/users/user-follows`);
        dispatch({
            type: GET_USER_VACATIONS,
            data: response.data
        })
    } catch (error) {
        dispatch({
            type: SERVER_ERROR,
            data: error.message
        })
        history.push('/error');
    }
}

export const addFollow = vacationId => async dispatch => {
    try {
        const response = await axios.post(`${database}/users/follow/${vacationId}`);
        dispatch({
            type: FOLLOW_VACATION,
            data: response.data.message
        })
    } catch (error) {
        dispatch({
            type: FOLLOW_VACATION_FAIL,
            data: error.message
        })
    }
}

export const removeFollow = vacationId => async dispatch => {
    try {
        const response = await axios.delete(`${database}/users/unfollow/${vacationId}`);
        dispatch({
            type: REMOVE_FOLLOW_VACATION,
            data: response.data.message
        })
    } catch (error) {
        dispatch({
            type: REMOVE_FOLLOW_VACATION_FAIL,
            data: error.message
        })
    }
}