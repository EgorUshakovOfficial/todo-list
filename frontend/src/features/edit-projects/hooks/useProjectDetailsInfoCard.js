import {useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import {AuthContext} from '../../../context/AuthProvider';
import { editProject } from '../../../services/projectApi';
import { HTTP_404_NOT_FOUND } from '../../../constants';

export default function useProjectDetailsInfoCard(initialState){
    const { authState } = useContext(AuthContext);

    const { projectId } = useParams();

    const toast = useToast();

    const [title, setTitle] = useState({ value:initialState.title, isReadOnly:true });
    const [description, setDescription] = useState({ value: initialState.description, isReadOnly:true });

    const titleOnChange = event => setTitle(state => ({ ...state, value:event.target.value }));
    const descriptionOnChange = event => setDescription(state => ({ ...state, value:event.target.value }));

    const titleOnClick = () => setTitle(state => ({ ...state, isReadOnly: !state.isReadOnly }));
    const descriptionOnClick = () => setDescription(state => ( {...state, isReadOnly: !state.isReadOnly }));

    const updateFieldValueOnClick = (fieldName, fieldValue) => {
        const data = { [fieldName]:fieldValue };
        const accessToken = authState.token;

        const projectOnSuccess = () => {
            if (fieldName === 'title'){
                setTitle({ value:fieldValue, isReadOnly:true });
            }
            else if (fieldName === 'description'){
                setDescription({ value:fieldValue, isReadOnly:true });
            }

            toast({
                title: `${fieldName} has been successfully updated!`,
                status:'success',
                isClosable:true
            });
        };

        const projectOnError = error => {
            const response = error?.response;
            const title = (response.status === HTTP_404_NOT_FOUND) ? `Error: Unable to edit ${fieldName} because project is not found` : 'Error! Something went wrong.';
            toast({
                title,
                status:'error',
                isClosable:true
            });
        };

        editProject(projectId, accessToken, data, projectOnSuccess, projectOnError);
    };

    return {
        title,
        description,
        titleOnChange,
        descriptionOnChange,
        titleOnClick,
        descriptionOnClick,
        updateFieldValueOnClick
    };
}