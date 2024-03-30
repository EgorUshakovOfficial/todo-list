import api from './api';
import {refreshAccessToken} from '../utils/token';

const attachInterceptors = (axiosInstance, options) => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
        config => {
            config.headers = options.headers;

            const withCredentials = options.withCredentials;
            if (withCredentials){
                config.withCredentials = withCredentials;
            }

            return config;
        },
        error => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
        response => response,
        async error => {
            const prevRequest = error?.config;

            if (error?.response?.status === 401 && !prevRequest?.sent){
                prevRequest.sent = true;
                try {
                    const newAccessToken = await refreshAccessToken();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api(prevRequest);
                } catch(refreshError){
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    return [requestInterceptor, responseInterceptor];
};

const get = (endpoint, options, onSuccess, onError) => {
    const [requestInterceptor, responseInterceptor] = attachInterceptors(api, options);

    api.get(endpoint)
    .then(response => onSuccess(response))
    .catch(error => onError(error));

    api.interceptors.request.eject(requestInterceptor);
    api.interceptors.response.eject(responseInterceptor);
};

const post = (endpoint, data, options, onSuccess, onError) => {
    const [requestInterceptor, responseInterceptor] = attachInterceptors(api, options);

    api.post(endpoint, data, options)
    .then(response => onSuccess(response))
    .catch(error => onError(error));

    api.interceptors.request.eject(requestInterceptor);
    api.interceptors.response.eject(responseInterceptor);
};

export {get, post};