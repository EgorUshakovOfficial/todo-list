import {createContext} from 'react';
import useAuth from '../hooks/useAuth';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const authProps = useAuth();

    // If a refresh token exists and an access token has not been retrieved, fetch it
    if (authProps.token === '' && authProps.isRefreshToken){
        return <div>Loading...</div>;
    };

    return (
        <AuthContext.Provider value={{...authProps}}>
            {children}
        </AuthContext.Provider>
    );
};

export  {AuthContext, AuthProvider};