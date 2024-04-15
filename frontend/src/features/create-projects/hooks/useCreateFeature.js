import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import { FeaturesContext } from '../../../context/FeaturesProvider';
import { INITIAL_STATUS } from '../../../constants';
import { createFeature } from '../../../services/featureApi';

export default function useCreateFeature(){
    const { authState } = useContext(AuthContext);
    const { setFeatures } = useContext(FeaturesContext);

    const { projectId } = useParams();

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({ name:'', description:'' });

    const nameOnChange = event => {
        setErrors(state => ({...state, name:''}));
        setName(event.target.value);
    }
    const descriptionOnChange = event => {
        setErrors(state => ({...state, description:''}));
        setDescription(event.target.value);
    }
    const toggleAccordion = () => setIsAccordionOpen(state => !state);

    const featureOnSuccess = response => {
        const newFeature = response?.data;
        setFeatures(state => ([...state, newFeature]));
    };

    const featureOnError = error => {
        const response = error?.response;
        console.log(`Error: ${response.data.error.message}`);
    };

    const validateFeatureData = data => {
        const formFieldErrors = {
            name: (data.name === '') ? 'Name is a required field.' : '',
            description: (data.description === '') ? 'Description is a required field.' : ''
        };
        setErrors(state => ({...state, ...formFieldErrors}));
        return Object.values(formFieldErrors).every(value => value === '');
    };

    const formOnSubmit = event => {
        event.preventDefault();

        const data = {
            name,
            description,
            status: INITIAL_STATUS
        };

        if (validateFeatureData(data)){
            const accessToken = authState.token;
            createFeature(projectId, accessToken, data, featureOnSuccess, featureOnError);
        }
    };

    return {
        isAccordionOpen,
        name,
        errors,
        description,
        toggleAccordion,
        nameOnChange,
        descriptionOnChange,
        formOnSubmit
    };
}