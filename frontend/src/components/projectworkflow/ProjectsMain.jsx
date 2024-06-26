import { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { CreateProject } from '../../features/create-projects';
import { AuthContext } from '../../context/AuthProvider';
import ProjectList from './ProjectList';

export default function ProjectsMain(){
    const { authState } = useContext(AuthContext);

    return (
        <Box>
            <Box>
                <Text as="h2">{authState.user.name}'s Projects</Text>
                <CreateProject />
            </Box>
            <ProjectList />
        </Box>
    );
}