import axios from 'axios';
import { DELETE_VACATION, CREATE_VACATION, UPDATE_VACATION, SERVER_ERROR } from '../actionTypes/actionTypes';

const database = 'http://localhost:5000';

export const createVacation = (state, history) => async dispatch => {
    try {
        const response = await axios.post(`${database}/admin/new-vacation`, state);
        dispatch({
            type: CREATE_VACATION,
            data: response.data.message
        });
        history.push('/');
    } catch (error) {
        dispatch({
            type: SERVER_ERROR,
            data: error.message
        });
        history.push('/error');
    }
}

export const updateVacation = (state, vacationId, history) => async dispatch => {
    try {
        const response = await axios.put(`${database}/admin/update-vacation/${vacationId}`, state);
        dispatch({
            type: UPDATE_VACATION,
            data: response.data.message
        });
        history.push('/');
    } catch (error) {
        dispatch({
            type: SERVER_ERROR,
            data: error.message
        });
        history.push('/error');
    }
}

export const deleteVacation = (vacationId, history) => async dispatch => {
    try {
        const response = await axios.delete(`${database}/admin/delete-vacation/${vacationId}`);
        dispatch({
            type: DELETE_VACATION,
            data: response.data.message
        });
    } catch (error) {
        dispatch({
            type: SERVER_ERROR,
            data: error.message
        });
        history.push('/error');
    }
}