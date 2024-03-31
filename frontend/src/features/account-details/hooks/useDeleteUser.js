import {useContext, useState} from 'react';
import {AuthContext} from '../../../context/AuthProvider';
import { deleteUser } from '../../../services/userApi';

export default function useDeleteUser(){
    const {authState, setAuthState} = useContext(AuthContext);
    const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

    const openDeleteUserModal = () => setDeleteUserModalOpen(true);
    const closeDeleteUserModal = () => setDeleteUserModalOpen(false);

    const userOnSuccess = () => setAuthState(() => ({user:null, token:''}));
    const userOnError = error => console.error(error);

    const deleteUserOnClick = () => {
        const token = authState.token;
        deleteUser(token, userOnSuccess, userOnError);
        setDeleteUserModalOpen()
    };

    return {
        deleteUserModalOpen,
        closeDeleteUserModal,
        openDeleteUserModal,
        deleteUserOnClick
    }
}