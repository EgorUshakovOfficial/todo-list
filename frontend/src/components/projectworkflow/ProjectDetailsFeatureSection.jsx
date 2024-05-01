import { useContext, Fragment } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { CreateFeature } from '../../features/create-projects';
import FeatureList from '../feature/FeatureList';
import { FeaturesContext } from '../../context/FeaturesProvider';
import { INITIAL_STATUS, PROGRESS_STATUS, COMPLETE_STATUS } from '../../constants';
import FeatureModal from '../feature/FeatureModal';

export default function ProjectDetailsFeatureSection() {
    const { features, isLoading, error, activeFeature } = useContext(FeaturesContext);

    const todoFeatures = features.filter(feature => feature?.status === INITIAL_STATUS);
    const progressFeatures = features.filter(feature => feature?.status === PROGRESS_STATUS);
    const completeFeatures = features.filter(feature => feature?.status === COMPLETE_STATUS);

    return (
        <Box
            width="100%"
            display="grid"
            gridTemplateColumns={{base: "1fr", md: "repeat(3, 1fr)"}}
            mt="6"
            paddingBlock="0.5em"
            border="1px solid lightgray"
            borderRadius="0.5em"
        >
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <Text>Error! Something went wrong!</Text>
            ) : (
                <Fragment>
                    <Box
                        display="grid"
                        rowGap="0.25em"
                    >
                        <FeatureList features={todoFeatures} />
                        <CreateFeature />
                    </Box>
                    <FeatureList features={progressFeatures} />
                    <FeatureList features={completeFeatures} />
                    {activeFeature ? <FeatureModal /> : null}
                </Fragment>
            )}
        </Box>
    );
}
