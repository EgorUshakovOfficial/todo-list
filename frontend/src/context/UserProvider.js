import { createContext, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import useUser from "../hooks/userUser";


const UserContext = createContext({});

const UserProvider = ({children}) => {
    const {isRefreshToken} = useContext(AuthContext);
    const userProps = useUser();

    // If the refresh token exists and user has not been retrieved, fetch it
    if (userProps.user === null && isRefreshToken){
        return <div>Loading...</div>;
    };

    return (
        <UserContext.Provider value={{...userProps}}>
           {children}
        </UserContext.Provider>
    );
};

export {UserContext, UserProvider};