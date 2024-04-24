import { useState, useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../../../context/AuthProvider';
import { FeaturesContext } from '../../../context/FeaturesProvider';
import { UserStoriesContext } from '../../../context/UserStoriesProvider';
import { INITIAL_STATUS } from '../../../constants';
import { createUserStory } from '../../../services/userStoryApi';

export default function useCreateUserStory(){
    const { authState } = useContext(AuthContext);
    const { activeFeature } = useContext(FeaturesContext);
    const { setStories } = useContext(UserStoriesContext);

    const toast = useToast();

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({ description: ''});

    const nameOnChange = event => setName(event.target.value);
    const descriptionOnChange = event => setDescription(event.target.value);
    const toggleAccordion = state => setIsAccordionOpen(!state);

    const validateData = data => {
        const formFieldErrors = {
            description: (data.description === '') ? 'Description is a required field.' : '',
            name: (data.name === '') ? 'Name is required.' : ''
        };

        setErrors(state => ({...state, ...formFieldErrors}));

        return Object.values(formFieldErrors).every(value => value === '');
    };

    const userStoryOnSuccess = response => {
        const newUserStory = response.data;

        setDescription('');
        setName('');

        toast({
            title:'New user story has been successfully created!',
            status:'success',
            isCloseable:true
        });

        setStories(state => {
            return [...state, {...newUserStory, tasks:[] } ];
        });
    };

    const userStoryOnError = () => {
        toast({
            title:'Something went wrong! Project could not be created.',
            status:'error',
            isCloseable:true
        });
    };

    const formOnSubmit = event => {
        event.preventDefault();

        const featureId = activeFeature.id;
        const data = {
            name,
            description,
            status: INITIAL_STATUS
        };

        if (validateData(data)){
            const accessToken = authState.token;
            createUserStory(featureId, accessToken, data, userStoryOnSuccess, userStoryOnError);
        }
    };

    return {
        isAccordionOpen,
        toggleAccordion,
        name,
        nameOnChange,
        description,
        descriptionOnChange,
        errors,
        formOnSubmit
    };
}