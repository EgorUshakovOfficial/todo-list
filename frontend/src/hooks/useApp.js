import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function useApp(){
    const { refreshTokenOnSuccess, refreshTokenOnError, refreshUserToken, token} = useContext(AuthContext);
    const isRefreshToken = document.cookie.includes('refresh');

    useEffect(() => {
        if (isRefreshToken && token === '') {
            refreshUserToken(refreshTokenOnSuccess, refreshTokenOnError);
        }
    }, [isRefreshToken, token, refreshUserToken, refreshTokenOnSuccess, refreshTokenOnError]);

    return { token, isRefreshToken };
}