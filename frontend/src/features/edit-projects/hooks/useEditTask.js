import { useState, useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../../../context/AuthProvider';
import UserStoryContext from '../../../context/UserStoryContext';
import { COMPLETE_STATUS, HTTP_404_NOT_FOUND } from '../../../constants';
import { editDeveloperTask } from '../../../services/developerTaskApi';

export default function useEditTask(initialState){
    const { authState } = useContext(AuthContext);
    const { userStoryId } = useContext(UserStoryContext);

    const toast = useToast();

    const [status, setStatus] = useState(initialState.status);

    const isTaskComplete = (status === COMPLETE_STATUS);

    const developerTaskOnClick = () => {
        const accessToken = authState.token;
        const taskId = initialState.id;
        const data = {  status : COMPLETE_STATUS };

        const taskOnSuccess = () => {
            setStatus(COMPLETE_STATUS);
            toast({
                title: 'Task has been marked successfully complete!',
                status: 'success',
                isClosable: true
            });
        };

        const taskOnError = error => {
            const response = error?.response;
            const title = (response.status === HTTP_404_NOT_FOUND) ? `Error: Unable to mark developer task complete because it is not found.` : 'Something went wrong! Developer could not be marked complete.';
            toast({
                title,
                status: 'error',
                isClosable: true,
            });
        };

        editDeveloperTask(taskId, userStoryId, accessToken, data, taskOnSuccess, taskOnError);
    };

    return {
        isTaskComplete,
        developerTaskOnClick
    };
}