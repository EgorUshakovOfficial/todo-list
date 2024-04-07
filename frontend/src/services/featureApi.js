import { get, post } from '../lib/httpService';

/*
* Creates a new feature.
* @param projectId is a UUID associated with a specific project.
* @param token is an access token.
* @param data is an object consisting of name and description fields, e.g. {title:"Title", description:"description"}
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const createFeature = (projectId, token, data, onSuccess, onError) => {
    const options = {
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    };

    post(`/projects/${projectId}/features/new`, data, options, onSuccess, onError);
};

/*
* Retrieves features associated with an existing project ID.
* @param projectId is a UUID associated with a specific project.
* @param token is an access token.
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const getFeatures = (projectId, token, onSuccess, onError) => {
    const options = {
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    };

    get(`/projects/${projectId}/features/`, options, onSuccess, onError);
};


export {
    createFeature,
    getFeatures
};