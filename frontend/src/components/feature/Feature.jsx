import { Box, Text } from '@chakra-ui/react';
import useFeature from '../../hooks/useFeature';

export default function Feature({ id, name, description, numUserStories }){
    const { updateActiveFeatureOnClick } = useFeature({ id, name, description });

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            border="1px solid lightgray"
            padding="0.5em 1rem"
            cursor="pointer"
            borderRadius="0.25em"
            onClick={updateActiveFeatureOnClick}
        >
            <Text as="p">{name}</Text>
            <Text as="span">{numUserStories}/10</Text>
        </Box>
    );
}