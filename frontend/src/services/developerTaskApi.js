import { get, post } from '../lib/httpService';

/*
* Creates a new developer task.
* @param userStoryId is a UUID associated with a specific user story.
* @param token is an access token.
* @param data is an object consisting of description field, e.g. {description:"developer task description"}
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const createDeveloperTask = (userStoryId, token, data, onSuccess, onError) => {
    const options = {
        headers:{
            'Content-type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials:true
    };

    post (`/stories/${userStoryId}/tasks/new`, data, options, onSuccess, onError);
};

/*
* Deletes an existing task.
* @param taskId is a UUID associated with a specified developer task.
* @param userStoryId is a UUID associated with a specified user story.
* @param token is an access token.
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const deleteDeveloperTask = (taskId, userStoryId, token, onSuccess, onError) => {
    const options = {
        headers:{
            'Content-type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials:true
    };

    const data = {};

    post(`/stories/${userStoryId}/tasks/${taskId}/delete`, data, options, onSuccess, onError);
};

/*
* Edits an existing task.
* @param taskId is a UUID associated with a specified developer task.
* @param userStoryId is a UUID associated with a specified user story.
* @param token is an access token.
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const editDeveloperTask = (taskId, userStoryId, token, data, onSuccess, onError) => {
    const options = {
        headers:{
            'Content-type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials:true
    };

    post(`/stories/${userStoryId}/tasks/${taskId}/partial`, data, options, onSuccess, onError);
};

/*
* Retrieves all of the tasks associated with a specified user story.
* @param userStoryId is a UUID associated with a specified user story.
* @param token is an access token.
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const getDeveloperTasks = (userStoryId, token, onSuccess, onError) => {
    const options = {
        headers:{
            'Content-type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials:true
    };

    get(`/stories/${userStoryId}/tasks`, options, onSuccess, onError);
}



export {
    createDeveloperTask,
    deleteDeveloperTask,
    editDeveloperTask,
    getDeveloperTasks
};