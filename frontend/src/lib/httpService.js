import axios from 'axios';
import { BASE_URL } from '../constants';

const get = (endpoint, options, onSuccess, onError) => {
    const url = `${BASE_URL}${endpoint}`;
    axios.get(url, options)
    .then(response => onSuccess(response))
    .catch(error => onError(error));
};

const post = (endpoint, data, options, onSuccess, onError) => {
    const url = `${BASE_URL}${endpoint}`;
    axios.post(url, data, options)
    .then(response => onSuccess(response))
    .catch(error => onError(error));
};

export {get, post};