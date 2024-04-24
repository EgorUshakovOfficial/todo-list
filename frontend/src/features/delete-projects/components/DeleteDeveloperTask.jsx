import { Button } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import useDeleteTask from '../hooks/useDeleteTask';

export default function DeleteDeveloperTask(props){
    const deleteTask = useDeleteTask({ id: props.id });

    return (
        <Button
            colorScheme='red'
            onClick={deleteTask}
        >
            <DeleteIcon />
        </Button>
    )
}