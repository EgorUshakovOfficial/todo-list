import { get, post } from '../lib/httpService';

/*
* Creates a new user story.
* @param featureId is a UUID associated with a specific feature.
* @param token is an access token.
* @param data is an object consisting of description and status fields, e.g. {description:"This is a description", status:"to-do"}
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const createUserStory = (featureId, token, data, onSuccess, onError) => {
    const options = {
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials:true
    };

    post(`/features/${featureId}/stories/new`, data, options, onSuccess, onError);
};

/*
* Edits an existing user story.
* @param userStoryId is a UUID associated with a specific user story.
* @param featureId is a UUID associated with a specific feature.
* @param token is an access token.
* @param data is an object consisting of a description field, e.g. { description:"This is my edited description" }
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const editUserStory = (userStoryId, featureId, token, data, onSuccess, onError) => {
    const options = {
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        withCredentials:true
    };

    post(`/features/${featureId}/stories/${userStoryId}/partial`, data, options, onSuccess, onError);
};

/*
* Retrieves all user stories associated with a specified feature.
* @param featureId is a UUID associated with a specific feature.
* @param token is an access token.
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const getUserStories = (featureId, token, onSuccess, onError) => {
    const options = {
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        withCredentials:true
    };

    get(`/features/${featureId}/stories/`, options, onSuccess, onError);
};

/*
* Deletes an existing user story.
* @param userStoryId is a UUID associated with a specific user story.
* @param featureId is a UUID associated with a specific feature.
* @param token is an access token.
* @param data is an object consisting of a description field, e.g. { description:"This is my edited description" }
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const deleteUserStory = (userStoryId, featureId, token, data, onSuccess, onError) => {
    const options = {
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        withCredentials:true
    };

    post(`/features/${featureId}/stories/${userStoryId}/delete`, data, options, onSuccess, onError);
};

export {
    createUserStory,
    deleteUserStory,
    editUserStory,
    getUserStories
};
