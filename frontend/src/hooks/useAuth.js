import {useState} from 'react';
import { login, logout, registerUser} from "../services/userApi";

export default function useAuth(){
    const [authState, setAuthState] = useState({token:'', user:null});

    return {
        authState,
        setAuthState,
        registerUser,
        login,
        logout
    };
}