import { useState, useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../../../context/AuthProvider';
import { UserStoriesContext } from '../../../context/UserStoriesProvider';
import { createDeveloperTask } from '../../../services/developerTaskApi';
import { INITIAL_STATUS } from '../../../constants';

export default function useCreateDeveloperTask(initialState){
    const { authState } = useContext(AuthContext);
    const { setStories } = useContext(UserStoriesContext);

    const toast = useToast();

    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({ description: '' });
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const descriptionOnChange = event => setDescription(event.target.value);
    const toggleAccordion = () => setIsAccordionOpen(state => !state);

    const userStoryId = initialState.id;

    const validateFormData = data => {
        const formFieldErrors = {
            description: (data.description === '') ? 'Description is required.' : ''
        };
        setErrors(state => ({...state, ...formFieldErrors}));
        return Object.values(formFieldErrors).every(value => value === '');
    };

    const userStoryOnSuccess = response => {
        const newTask = response.data;

        setStories(stories => {
            return stories.map(story => {
                if (story.id === userStoryId){
                    const prevTasks = [...story.tasks];
                    story.tasks = [...prevTasks, newTask];
                }
                return story;
            })
        });
    };

    const userStoryOnError = () => {
        toast({
            title: 'Something went wrong! Project could not be created.',
            status:'error',
            isClosable:true
        });
    };

    const formOnSubmit = event => {
        event.preventDefault();

        const data = {
            description,
            status: INITIAL_STATUS
        };

        if (validateFormData(data)){
            const accessToken = authState.token;
            createDeveloperTask(userStoryId, accessToken, data, userStoryOnSuccess, userStoryOnError);
        }
    }

    return {
        description,
        descriptionOnChange,
        isAccordionOpen,
        toggleAccordion,
        errors,
        formOnSubmit
    };
}