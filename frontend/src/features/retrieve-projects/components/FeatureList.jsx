import { Box, Text } from '@chakra-ui/react';
import Feature from './Feature';

export default function FeatureList({ features }) {
    return (
        <Box>
            {(features.length === 0) ?
                <Text>No features are currently available.</Text>
                :
                features.map(feature => (
                    <Feature
                        key={feature.id}
                        name={feature.name}
                        numUserStories={3}
                    />
                ))
            }
        </Box>
    );
}
