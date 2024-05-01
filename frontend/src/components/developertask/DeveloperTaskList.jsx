import { Box, Text } from '@chakra-ui/react';
import DeveloperTask from './DeveloperTask';

export default function TaskList({ tasks }){
    return (
        <Box
            display="grid"
            rowGap="0.25em"
            marginBlock="1em"
        >
            { tasks.length === 0 ?
                <Text>No developer tasks are currently available.</Text>
                :
                tasks.map(task =>
                    <DeveloperTask
                        key={task.id}
                        id={task.id}
                        description={task.description}
                        status={task.status}
                    />
                )
            }
        </Box>
    );
}