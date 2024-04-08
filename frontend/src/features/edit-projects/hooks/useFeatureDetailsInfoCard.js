import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../../../context/AuthProvider';
import { editFeature } from '../../../services/featureApi';
import { HTTP_404_NOT_FOUND } from '../../../constants';

export default function useFeatureDetailsInfoCard(initialState){
    const { projectId } = useParams();

    const toast = useToast();

    const { authState } = useContext(AuthContext);

    const [name, setName] = useState({ value:initialState.name, isReadOnly:true});
    const [description, setDescription] = useState({value:initialState.description, isReadOnly:true});

    const nameOnChange = event => setName(state => ({...state, value:event.target.value}));
    const descriptionOnChange = event => setDescription(state => ({...state, value:event.target.value}));

    const nameOnClick = () => setName(state => ({...state, isReadOnly:!state.isReadOnly}));
    const descriptionOnClick = () => setDescription(state => ({...state, isReadOnly: !state.isReadOnly}));

    const updateFieldValueOnClick = (fieldName, fieldValue) => {
        const data = { [fieldName]: fieldValue };
        const accessToken = authState.token;
        const featureId = initialState.id;

        const featureOnSuccess = () => {
            if (fieldName === 'name'){
                setName({ value: fieldValue, isReadOnly: true });
            }
            else if (fieldName === 'description'){
                setDescription({ value: fieldValue, isReadOnly: true });
            }

            toast({
                title: `${fieldName} has been successfully updated!`,
                status:'success',
                isClosable:true
            });
        }

        const featureOnError = error => {
            const response = error?.response;
            const title = (response.status === HTTP_404_NOT_FOUND) ? `Error: Unable to edit ${fieldName} because feature is not found` : 'Error! Something went wrong.';
            toast({
                title,
                status:'error',
                isClosable:true
            });
        }

        editFeature(featureId, projectId, accessToken, data, featureOnSuccess, featureOnError);
    };
    return {
        name,
        description,
        nameOnChange,
        descriptionOnChange,
        nameOnClick,
        descriptionOnClick,
        updateFieldValueOnClick
    };
}