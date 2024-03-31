import {Navigate, Outlet} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthProvider';
import { LOGIN_ENDPOINT } from '../../constants';

export default function PrivateRoute(){
    const {authState} = useContext(AuthContext);

    if (authState.token === ''){
        return <Navigate to={LOGIN_ENDPOINT} />;
    };

    return <Outlet />;
};