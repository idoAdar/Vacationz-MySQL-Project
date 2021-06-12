import axios from 'axios';

const authentication = token => {
    if (token) {
        return axios.defaults.headers.common['Authentication'] = `Bearer ${token}`;
    }
    delete axios.defaults.headers.common['Authentication'];  
}

export default authentication;