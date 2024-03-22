import {useState} from 'react';
import { login, registerUser, refreshUserToken } from "../services/userApi";

export default function useAuth(){
    const [token, setToken] = useState('');

    const refreshTokenOnSuccess = data => setToken(data.access);
    const refreshTokenOnError = error => console.log(error);

    return {
        token,
        setToken,
        refreshTokenOnSuccess,
        refreshTokenOnError,
        registerUser,
        refreshUserToken,
        login
    };
}