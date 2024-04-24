import { useContext, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../../../context/AuthProvider';
import { FeaturesContext } from '../../../context/FeaturesProvider';
import { UserStoriesContext } from '../../../context/UserStoriesProvider';
import { editUserStory } from '../../../services/userStoryApi';
import { HTTP_404_NOT_FOUND } from '../../../constants';

export default function useEditUserStory(initialState){
    const { authState } = useContext(AuthContext);
    const { activeFeature } = useContext(FeaturesContext);
    const { setStories } = useContext(UserStoriesContext);

    const toast = useToast();

    const [name, setName] = useState({ value: initialState.name, isReadOnly:true});

    const nameOnChange = event => setName(state => ({...state, value:event.target.value}));
    const nameOnClick = () => setName(state => ({...state, isReadOnly:!state.isReadOnly}));

    const updateFieldValueOnClick = (fieldName, fieldValue) => {
        const data = { [fieldName]: fieldValue };

        const accessToken = authState.token;
        const userStoryId = initialState.id;
        const featureId = activeFeature.id;

        const userStoryOnSucccess = response => {
            if ( fieldName === 'name'){
                setName(state => ({...state, isReadOnly:true}));
            }

            const title = `${fieldName} has been successfully updated!`;
            toast({
                title,
                status:'success',
                isClosable:true
            });

            setStories(prevStories => {
                const updatedStoryIdx = prevStories.findIndex(story => story.id === userStoryId);
                return prevStories.map((story, index) => {
                    if (index === updatedStoryIdx){
                        return {...story, ...data};
                    }
                    return story;
                });
            });
        };

        const userStoryOnErrror = error => {
            const response = error.response;
            const title = (response.status === HTTP_404_NOT_FOUND) ? `Error: Unable to edit ${fieldName} because user story is not found` : 'Something went wrong! User story could not update.';
            toast({
                title,
                status:'error',
                isClosable:true
            });
        };

        editUserStory(userStoryId, featureId, accessToken, data, userStoryOnSucccess, userStoryOnErrror);
    };

    return {
        name,
        nameOnChange,
        nameOnClick,
        updateFieldValueOnClick
    };
}