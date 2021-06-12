import { GET_ALL_VACATIONS, 
    GET_USER_VACATIONS, 
    REMOVE_FOLLOW_VACATION,
    REMOVE_FOLLOW_VACATION_FAIL,
    FOLLOW_VACATION, 
    FOLLOW_VACATION_FAIL,
    CLEAR_NOTE, 
    DELETE_VACATION,
    CREATE_VACATION,
    UPDATE_VACATION, 
    SERVER_ERROR} 
from '../actionTypes/actionTypes';

const initState = {
    vacations: [],
    note: '',
    isLoading: true
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case GET_ALL_VACATIONS:
        case GET_USER_VACATIONS:
            return {
                ...state,
                vacations: action.data,
                isLoading: false
            }
        case FOLLOW_VACATION:
        case REMOVE_FOLLOW_VACATION:
        case FOLLOW_VACATION_FAIL:
        case REMOVE_FOLLOW_VACATION_FAIL:
        case CREATE_VACATION:
        case UPDATE_VACATION:
        case DELETE_VACATION:
        case SERVER_ERROR:
            return {
                ...state,
                note: action.data,
                isLoading: false
            }
        case CLEAR_NOTE:
            return {
                ...state,
                note: '',
                isLoading: false
            }
        default: return state
    }
}

export default reducer;