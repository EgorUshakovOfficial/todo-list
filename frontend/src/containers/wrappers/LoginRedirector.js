import { useContext } from 'react';
import {AuthContext} from '../../context/AuthProvider';
import {Outlet, Navigate} from 'react-router-dom';

export default function LoginRedirector(){
    const {authState} = useContext(AuthContext);

    return (authState.token !== '') ? <Navigate to='/dashboard' /> : <Outlet />;
}