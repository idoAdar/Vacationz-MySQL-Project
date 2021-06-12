import { SIGN_UP, 
    LOGOUT, 
    SET_SPINNER, 
    SIGN_UP_FAIL } 
from '../actionTypes/actionTypes';

const user = JSON.parse(localStorage.getItem('user'));

const initState = {
    user: user || null,
    isAdmin: user ? user.isAdmin : null,
    note: '',
    isLoading: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                user: action.data,
                isAdmin: action.data.isAdmin,
                isAuth: true,
                isLoading: false
            }
        case SIGN_UP_FAIL:
            return {
                ...state,
                note: action.data,
                isLoading: false
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAdmin: 0,
                isAuth: false,
                isLoading: false
            }
        case SET_SPINNER:
            return {
                ...state,
                isLoading: true
            }
        default: return state;
    }
}

export default reducer;