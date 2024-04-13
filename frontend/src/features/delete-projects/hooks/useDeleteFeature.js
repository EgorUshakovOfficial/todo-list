import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../../../context/AuthProvider';
import { FeaturesContext } from '../../../context/FeaturesProvider';
import { deleteFeature } from '../../../services/featureApi';
import { HTTP_404_NOT_FOUND } from '../../../constants';

export default function useDeleteFeature(initialState){
    const { authState } = useContext(AuthContext);

    const { setActiveFeature, setFeatures } = useContext(FeaturesContext);

    const { projectId } = useParams();

    const toast = useToast();

    const [ isModalOpen, setIsModalOpen] = useState(false);

    const openDeleteModal = () => setIsModalOpen(true);
    const closeDeleteModal = () => setIsModalOpen(false);

    const featureId = initialState.id;

    const featureOnSuccess = () => {
        toast({
            title: `Feature with ${featureId} has been successfully deleted!`,
            status: 'success',
            isClosable:true
        });
    };

    const featureOnError = error => {
        const response = error?.response;
        const title = (response.status === HTTP_404_NOT_FOUND) ? 'Error: Project not found!' : 'Something went wrong! Project could not be deleted.';
        toast({
            title,
            status:'error',
            isClosable:true
        });
    };

    const deleteFeatureOnClick = () => {
        const accessToken = authState.token;
        deleteFeature(featureId, projectId, accessToken, featureOnSuccess, featureOnError);
        setFeatures( features => features.filter(feature => feature.id !== featureId));
        setActiveFeature(null);
        closeDeleteModal();
    };

    return {
        isModalOpen,
        closeDeleteModal,
        openDeleteModal,
        deleteFeatureOnClick
    }
}