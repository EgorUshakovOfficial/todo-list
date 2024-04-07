import { Box, Text } from '@chakra-ui/react';

export default function Feature({ name, numUserStories }){
    return (
        <Box>
            <Text as="p">{name}</Text>
            <Text as="span">{numUserStories}/10</Text>
        </Box>
    );
}