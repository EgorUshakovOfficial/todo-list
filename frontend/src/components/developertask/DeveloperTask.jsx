import { Box } from '@chakra-ui/react';
import { DeleteDeveloperTask } from '../../features/delete-projects';
import { EditDeveloperTask } from '../../features/edit-projects';

export default function DeveloperTask(props){
    return (
        <Box
            display="flex"
        >
            <Box as="p">{props.description}</Box>
            <DeleteDeveloperTask id={props.id} />
            <EditDeveloperTask id={props.id} status={props.status} />
        </Box>
    )
};