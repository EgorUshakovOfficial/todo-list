import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { refreshUserToken, getUser } from "../../services/userApi";
import { HTTP_401_UNAUTHORIZED_ACCESS, LOGIN_ENDPOINT } from "../../constants";

export default function PersistLogin(){
    const [isLoading, setIsLoading] = useState(true);
    const {setAuthState} = useContext(AuthContext);
    const navigate = useNavigate();

    const tokenOnSuccess = response => {
        const token = response.data.access;

        const fetchUser = () => {
            const userOnSuccess = response => {
                const user = response.data;
                setAuthState(state => ({user:{...user}, token}));
                setIsLoading(false);
            };

            const userOnError = error => {
                const response = error?.response;
                if (response.status === HTTP_401_UNAUTHORIZED_ACCESS){
                    navigate(LOGIN_ENDPOINT);
                    setIsLoading(false);
                }
            };

            getUser(token, userOnSuccess, userOnError);
        }

        fetchUser();
    };

    const tokenOnError = error => {
        setIsLoading(false);
        navigate(LOGIN_ENDPOINT);
    };

    useEffect(() => {
        refreshUserToken(tokenOnSuccess, tokenOnError);
    }, []);

    return isLoading ? <div>Loading...</div> : <Outlet />;
}