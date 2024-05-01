import { Box } from '@chakra-ui/react';
import { DeleteDeveloperTask } from '../../features/delete-projects';
import { EditDeveloperTask } from '../../features/edit-projects';

export default function DeveloperTask(props){
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            border="1px solid #E2E8F0"
            borderRadius="0.25em"
            padding="0.5em 1em"
        >
            <Box as="p">{props.description}</Box>
            <Box
                display="flex"
                alignItems="center"
            >
                <DeleteDeveloperTask id={props.id} />
                <EditDeveloperTask id={props.id} status={props.status} />
            </Box>
        </Box>
    )
};