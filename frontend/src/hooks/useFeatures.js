import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthProvider';
import { getFeatures } from '../services/featureApi';

export default function useFeatures(){
    const { authState } = useContext(AuthContext);

    const { projectId } = useParams();

    const toast = useToast();

    const [features, setFeatures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const featuresOnSuccess = response => {
        setIsLoading(false);

        const features = response.data?.features;
        setFeatures(features);
    };

    const featuresOnError = error => {
        setIsLoading(false);

        const response = error?.response;
        const errorObj = response?.data?.error;

        toast({
            title:'Error! Features could not load.',
            status:'error',
            isClosable:true
        });

        setError(errorObj);
    };

    useEffect(() => {
        const accessToken = authState.token;
        getFeatures(projectId, accessToken, featuresOnSuccess, featuresOnError);
    }, []);

    return {
        features,
        setFeatures,
        isLoading,
        setIsLoading,
        error,
        setError
    };
}