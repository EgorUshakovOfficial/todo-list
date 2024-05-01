import { Button, Tooltip } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import useDeleteTask from '../hooks/useDeleteTask';

export default function DeleteDeveloperTask(props){
    const deleteTask = useDeleteTask({ id: props.id });

    return (
        <Tooltip label="Delete task">
            <Button
                colorScheme='transparent'
                onClick={deleteTask}
            >
                <DeleteIcon color="black" />
            </Button>
        </Tooltip>
    )
}