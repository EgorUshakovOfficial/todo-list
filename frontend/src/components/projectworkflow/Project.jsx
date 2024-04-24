import { Box, Text} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { formatStatus } from '../../utils/projects';

export default function Project(props){
    const { id, title, description, status } = props;
    const projectStatus = formatStatus(status);
    return (
        <Link to={`/projects/${id}`}>
            <Box mt="4">
                <Text>{title}</Text>
                <Text>{description}</Text>
                <Text>{projectStatus}</Text>
            </Box>
        </Link>
    );
}