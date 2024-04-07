import { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ProjectList } from '../features/retrieve-projects';
import { CreateProject } from '../features/create-projects';
import { AuthContext } from '../context/AuthProvider';

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