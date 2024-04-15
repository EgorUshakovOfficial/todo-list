import { get, post } from '../lib/httpService';

/*
* Creates a new user story.
* @param featureId is a UUID associated with a specific feature.
* @param token is an access token.
* @param onSuccess is a callback that executes on a successful response.
* @param onError is a callback that executes on an error response.
*/
const createUserStory = (featureId, token, data, onSuccess, onError) => {
    const options = {
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    };

    post(`/features/${featureId}/stories/new`, data, options, onSuccess, onError);
};

export { createUserStory };