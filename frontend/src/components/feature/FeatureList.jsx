import { Fragment } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Feature from './Feature';

export default function FeatureList({ features }) {
    return (
        <Box
            width="96%"
            margin="auto"
            display="grid"
            rowGap="0.25em"
        >
            {(features.length === 0) ?
                <Text textAlign="center">No features are currently available.</Text>
                :
                <Fragment>
                    {features.map(feature => (
                        <Feature
                            key={feature.id}
                            id={feature.id}
                            name={feature.name}
                            description={feature.description}
                            numUserStories={3}
                        />
                    ))}
                </Fragment>
            }
        </Box>
    );
}
