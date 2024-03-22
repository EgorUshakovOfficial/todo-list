import { createContext } from "react";
import useUser from "../hooks/userUser";

const UserContext = createContext({});

const UserProvider = ({children}) => {
    const userProps = useUser();

    return (
        <UserContext.Provider value={{...userProps}}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContext, UserProvider};