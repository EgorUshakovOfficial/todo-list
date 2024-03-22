import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { getUser } from '../services/userApi';

export default function useUser(){
    const [user, setUser] = useState(null);
    const { token } = useContext(AuthContext);

    const userOnSuccess = data => setUser(data);
    const userOnError  = error => console.log(`Error: ${error}`);

    useEffect(() => {
        if (token !== ''){
            getUser(token, userOnSuccess, userOnError);
        }

    }, [token]);

    return {user};
};