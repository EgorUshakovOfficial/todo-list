import { Box, Text} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { formatStatus } from '../../utils/projects';

export default function Project(props){
    const { id, title, description, status } = props;
    const projectStatus = formatStatus(status);
    return (
        <Link to={`/projects/${id}`}>
            <Box
                mt="2"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                border="1px solid lightgray"
                padding="1em"
                borderRadius="0.5em"
                gap="0.5em"
            >
                <Text>{title}</Text>
                <Text>{description}</Text>
                <Text>{projectStatus}</Text>
            </Box>
        </Link>
    );
}