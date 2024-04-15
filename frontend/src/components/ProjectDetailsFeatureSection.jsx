import { useContext, Fragment } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { CreateFeature } from '../features/create-projects';
import { FeatureList } from '../features/retrieve-projects';
import { FeaturesContext } from '../context/FeaturesProvider';
import { INITIAL_STATUS, PROGRESS_STATUS, COMPLETE_STATUS } from '../constants';
import FeatureModal from './FeatureModal';

export default function ProjectDetailsFeatureSection() {
    const { features, isLoading, error, activeFeature } = useContext(FeaturesContext);

    const todoFeatures = features.filter(feature => feature?.status === INITIAL_STATUS);
    const progressFeatures = features.filter(feature => feature?.status === PROGRESS_STATUS);
    const completeFeatures = features.filter(feature => feature?.status === COMPLETE_STATUS);

    return (
        <Box>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <Text>Error! Something went wrong!</Text>
            ) : (
                <Fragment>
                    <Box>
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
