import { Box } from '@chakra-ui/react';
import { EditField } from '../../../components';
import { useProjectDetailsInfoCard } from '../hooks';

export default function ProductDetailsInfoCard(props){
    const projectDetailsInfoCardProps = useProjectDetailsInfoCard({ title:props.title, description:props.description });
    const { title, description, ...callbackProps } = projectDetailsInfoCardProps;

    return (
        <Box>
            <EditField
                fieldName="Title"
                fieldObj={title}
                fieldOnChange={callbackProps.titleOnChange}
                fieldOnClick={callbackProps.titleOnClick}
                updateFieldValueOnClick={() => callbackProps.updateFieldValueOnClick("title", title.value)}
            />
            <EditField
                fieldName="Description"
                fieldObj={description}
                fieldOnChange={callbackProps.descriptionOnChange}
                fieldOnClick={callbackProps.descriptionOnClick}
                updateFieldValueOnClick={() => callbackProps.updateFieldValueOnClick("description", description.value)}
            />
        </Box>
    );
}