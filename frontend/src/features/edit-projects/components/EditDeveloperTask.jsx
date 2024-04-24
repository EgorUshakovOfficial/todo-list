import { Button, Text } from '@chakra-ui/react';
import useEditTask from "../hooks/useEditTask";

export default function EditDeveloperTask(props){
    const { isTaskComplete, developerTaskOnClick } = useEditTask( { id: props.id, status: props.status } );

    return (
        isTaskComplete ?
        <Text>
            Complete
        </Text>
        :
        <Button color="green" onClick={developerTaskOnClick}>
            Done
        </Button>
    );
}