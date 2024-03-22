import axios from 'axios';
import { BASE_URL } from '../constants';

axios.defaults.withCredentials = true;

const get = (endpoint, headers, onSuccess, onError) => {
    const url = `${BASE_URL}${endpoint}`;
    axios(url, {headers})
    .then(response => onSuccess(response.data))
    .catch(error => onError(error.data));
};

const post = (endpoint, data, headers, onSuccess, onError) => {
    const url = `${BASE_URL}${endpoint}`;
    axios.post(url, data, {headers})
    .then(response => onSuccess(response.data))
    .catch(error => onError(error.data));
};

export {get, post};