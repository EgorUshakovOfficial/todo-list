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
* Edits the project fields.
* @param projectId is a UUID associated with a specific project.
* @param token is an access token.
* @param data is an object consisting of title, description, and status fields, e.g. {title:"Title", description:"description", status:"completed"}
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const editProject = (projectId, token, data, onSuccess, onError) => {
    const options = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials:true
    };

    post(`/projects/${projectId}/partial`, data, options, onSuccess, onError);
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

/*
* Deletes an existing project.
* @param projectId is a UUID associated with a specific project.
* @param token is an access token.
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const deleteProject = (projectId, token, onSuccess, onError) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    };

    get(`/projects/${projectId}/delete`, options, onSuccess, onError);
}

/*
* Retrieves an existing project.
* @param projectId is a UUID associated with a specific project.
* @param token is an access token.
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const getProjectDetails = (projectId, token, onSuccess, onError) => {
    const options = {
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    };

    get(`/projects/${projectId}`, options, onSuccess, onError);
};

export {
    getProjectWorkflows,
    getProjectDetails,
    editProject,
    createNewProject,
    deleteProject
}