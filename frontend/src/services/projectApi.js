import { get, post } from '../lib/httpService';

/*
* Retrieves the list of the user's project workflows.
* @param token is an access token.
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const getProjectWorkflows = (token, onSuccess, onError) => {
    const options = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials:true
    };

    get('/projects/', options, onSuccess, onError);
};

/*
* Creates a new project.
* @param token is an access token.
* @param data is an object consisting of title and description fields, e.g. {title:"Title", description:"description"}
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const createNewProject = (token, data, onSuccess, onError) => {
    const options = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    };
    post('/projects/new', data, options, onSuccess, onError);
};

export {
    getProjectWorkflows,
    createNewProject
}