import { Box, Text } from '@chakra-ui/react';
import useFeature from '../../hooks/useFeature';

export default function Feature({ id, name, description, numUserStories }){
    const { updateActiveFeatureOnClick } = useFeature({ id, name, description });

    return (
        <Box onClick={updateActiveFeatureOnClick} >
            <Text as="p">{name}</Text>
            <Text as="span">{numUserStories}/10</Text>
        </Box>
    );
}