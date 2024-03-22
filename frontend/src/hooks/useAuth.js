import {useState, useEffect} from 'react';
import { login, logout, registerUser, refreshUserToken } from "../services/userApi";

export default function useAuth(){
    const [token, setToken] = useState('');
    const isRefreshToken = document.cookie.includes('refresh');

    const refreshTokenOnSuccess = data => setToken(data.access);
    const refreshTokenOnError = error => console.log(error);

    useEffect(() => {
        if (isRefreshToken && token === '') {
            refreshUserToken(refreshTokenOnSuccess, refreshTokenOnError);
        }
    }, [isRefreshToken, token, refreshUserToken, refreshTokenOnSuccess, refreshTokenOnError]);

    return {
        token,
        setToken,
        isRefreshToken,
        refreshTokenOnSuccess,
        refreshTokenOnError,
        registerUser,
        refreshUserToken,
        login,
        logout
    };
}