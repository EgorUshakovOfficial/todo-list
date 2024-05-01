import { EditField } from '../../../components';
import useEditUserStory from '../hooks/useEditUserStoryDescription';

export default function EditUserStoryDescription(props){
    const editUserStoryProps = useEditUserStory( { id: props.id, description: props.description } );
    const { description, ...callbackProps } = editUserStoryProps;

    return (
        <EditField
            fieldName="description"
            fieldObj={description}
            fieldOnChange={callbackProps.descriptionOnChange}
            fieldOnClick={callbackProps.descriptionOnClick}
            updateFieldValueOnClick={() => callbackProps.updateFieldValueOnClick('description', description.value)}
        />
    );
};