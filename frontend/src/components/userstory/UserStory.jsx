import {
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box
} from '@chakra-ui/react';
import { CreateDeveloperTask } from '../../features/create-projects';
import { EditUserStoryDescription, EditUserStoryName } from '../../features/edit-projects';
import DeveloperTaskList from '../developertask/DeveloperTaskList';
import UserStoryContext from '../../context/UserStoryContext';

export default function UserStory({ id, name, description, tasks, status }){
    return (
        <AccordionItem>
            <AccordionButton>
                <Box>{name}</Box>
            </AccordionButton>
            <AccordionPanel>
                <EditUserStoryName id={id} name={name} />
                <EditUserStoryDescription id={id} description={description} />
                <UserStoryContext.Provider value={ { userStoryId: id }}>
                    <DeveloperTaskList tasks={tasks} />
                </UserStoryContext.Provider>
                <CreateDeveloperTask userStoryId={id} />
            </AccordionPanel>
        </AccordionItem>
    );
}