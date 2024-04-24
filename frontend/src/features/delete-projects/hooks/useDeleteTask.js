import { useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../../../context/AuthProvider';
import { UserStoriesContext } from '../../../context/UserStoriesProvider';
import UserStoryContext from '../../../context/UserStoryContext';
import { deleteDeveloperTask } from '../../../services/developerTaskApi';

export default function useDeleteTask(initialState){
    const { authState } = useContext(AuthContext);
    const { setStories } = useContext(UserStoriesContext);
    const { userStoryId } = useContext(UserStoryContext);

    const taskId = initialState.id;

    const toast = useToast();

    const taskOnSuccess = () => {
        toast({
            title: 'Task has been successfully deleted!',
            status:'success',
            isClosable:true
        });

        setStories(stories => {
            return stories.map(story => {
                if (story.id === userStoryId){
                    const initTasks = story.tasks;
                    const updatedTasks = initTasks.filter(task => task.id !== taskId);
                    story.tasks = updatedTasks;
                }
                return story;
            })
        })
    };

    const taskOnError = () => {
        toast({
            title:'Something went wrong! Project could not be deleted.',
            status:'error',
            isClosable:true
        });
    }

    const deleteTaskOnClick = () => {
        const accessToken = authState.token;
        deleteDeveloperTask(taskId, userStoryId, accessToken, taskOnSuccess, taskOnError);
    };

    return deleteTaskOnClick;
}