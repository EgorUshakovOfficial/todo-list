import {createContext} from 'react';
import useAuth from '../hooks/useAuth';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const authProps = useAuth();

    return (
        <AuthContext.Provider value={{...authProps}}>
            {children}
        </AuthContext.Provider>
    );
};

export  {AuthContext, AuthProvider};