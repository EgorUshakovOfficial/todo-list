import { Box } from '@chakra-ui/react';
import { EditField } from '../../../components';
import useFeatureDetailsInfoCard from '../hooks/useFeatureDetailsInfoCard';

export default function FeatureDetailsInfoCard({ id, name, description }){
    const initialState = { id, name, description};
    const {
        name:nameObj,
        description:descriptionObj,
        updateFieldValueOnClick,
        ...otherCallbacks
    } = useFeatureDetailsInfoCard(initialState);

    return (
        <Box>
            <EditField
                fieldName="Name"
                fieldObj={nameObj}
                fieldOnChange={otherCallbacks.nameOnChange}
                fieldOnClick={otherCallbacks.nameOnClick}
                updateFieldValueOnClick={() => updateFieldValueOnClick('name', nameObj.value)}
            />
            <EditField
                fieldName="Description"
                fieldObj={descriptionObj}
                fieldOnChange={otherCallbacks.descriptionOnChange}
                fieldOnClick={otherCallbacks.descriptionOnClick}
                updateFieldValueOnClick={() => updateFieldValueOnClick('description', descriptionObj.value)}
            />
        </Box>
    );
}