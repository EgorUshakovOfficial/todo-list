import { Box } from '@chakra-ui/react';
import { EditField } from '../../../components';
import { useProjectDetailsInfoCard } from '../hooks';

export default function ProductDetailsInfoCard(props){
    const projectDetailsInfoCardProps = useProjectDetailsInfoCard({ title:props.title, description:props.description });
    const { title, description, ...callbackProps } = projectDetailsInfoCardProps;

    return (
        <Box
            display="grid"
            rowGap="1em"
        >
            <EditField
                fieldName="title"
                fieldObj={title}
                fieldOnChange={callbackProps.titleOnChange}
                fieldOnClick={callbackProps.titleOnClick}
                updateFieldValueOnClick={() => callbackProps.updateFieldValueOnClick("title", title.value)}
            />
            <EditField
                fieldName="description"
                fieldObj={description}
                fieldOnChange={callbackProps.descriptionOnChange}
                fieldOnClick={callbackProps.descriptionOnClick}
                updateFieldValueOnClick={() => callbackProps.updateFieldValueOnClick("description", description.value)}
            />
        </Box>
    );
}