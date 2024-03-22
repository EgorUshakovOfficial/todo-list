import {get, post} from '../lib/httpService';

/*
* Logs the user in.
* @param email is the user's email address.
* @param password is the user's password.
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const login = (email, password, onSuccess, onError) => {
    const data = {email, password};
    const headers = {'Content-Type':'application/json'};
    post('/users/login', data, headers, onSuccess, onError);
};

/*
* Retrieves user information based on an access token.
* @param token is an access token.
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const getUser = (token, onSuccess, onError) => {
    const headers = {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    };
    get('/users/me', headers, onSuccess, onError);
}

/*
* Creates new user account.
* @param userData is an object filled with required user fields.
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const registerUser = (userData, onSuccess, onError) => {
    const headers = {'Content-Type':'multipart/form-data'};

    // Convert user data object into form data, due to the content type.
    const formData = new FormData();

    // Add user fields in user data to the form data
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('username', userData.username);
    formData.append('profileImage', userData.profileImage);
    formData.append('password', userData.password);

    post('/users/register', formData, headers, onSuccess, onError);
};

/*
* Refreshs access token of the user.
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const refreshUserToken = (onSuccess, onError) => {
    const headers = {'Content-Type':'application/json'};
    get('/users/refresh', headers, onSuccess, onError);
}

export  {
    login,
    getUser,
    registerUser,
    refreshUserToken
};