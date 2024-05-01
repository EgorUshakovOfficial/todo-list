import { Button, Text, Tooltip } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import useEditTask from "../hooks/useEditTask";

export default function EditDeveloperTask(props){
    const { isTaskComplete, developerTaskOnClick } = useEditTask( { id: props.id, status: props.status } );

    return (
        isTaskComplete ?
        <Text>
            Complete
        </Text>
        :
        <Tooltip label="Task complete">
            <Button colorScheme='transparent' onClick={developerTaskOnClick}>
                <CheckIcon color="green.500" />
            </Button>
        </Tooltip>
    );
}