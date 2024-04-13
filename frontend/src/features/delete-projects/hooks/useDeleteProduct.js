import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../../../context/AuthProvider';
import { deleteProject } from '../../../services/projectApi';
import { HTTP_404_NOT_FOUND } from '../../../constants';

export default function useDeleteProduct(){
    const { authState } = useContext(AuthContext);

    const { projectId } = useParams();
    const navigate = useNavigate();

    const toast = useToast();

    const [isModelOpen, setIsModelOpen] = useState(false);

    const openModelOnClick = () => setIsModelOpen(true);
    const closeModelOnClick = () => setIsModelOpen(false);

    const projectOnSuccess = () => {
        closeModelOnClick();
        navigate('/projects');
        toast({
            title:'Product hass been successfully deleted!',
            status:'success',
            isClosable:true
        });
    };

    const projectOnError = error => {
        const response = error?.response;
        const title = (response.status === HTTP_404_NOT_FOUND) ? 'Error! Product has already been deleted' : 'Error! Something went wrong.';
        closeModelOnClick();
        navigate('/projects');
        toast({
            title,
            status:'error',
            isClosable:true
        });
    };

    const deleteProjectOnClick = () => {
        const accessToken = authState.token;
        deleteProject(projectId, accessToken, projectOnSuccess, projectOnError);
    };

    return {
        isModelOpen,
        openModelOnClick,
        closeModelOnClick,
        deleteProjectOnClick
    };

}