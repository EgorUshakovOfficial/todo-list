import { EditField } from "../../../components";
import useEditUserStoryName from '../hooks/useEditUserStoryName'

export default function EditUserStoryName(props){
    const editUserStoryNameProps = useEditUserStoryName({ id: props.id, name: props.name });
    const { name, ...callbackProps } = editUserStoryNameProps;

    return (
        <EditField
            fieldName="name"
            fieldObj={name}
            fieldOnChange={callbackProps.nameOnChange}
            fieldOnClick={callbackProps.nameOnClick}
            updateFieldValueOnClick={() => callbackProps.updateFieldValueOnClick('name', name.value)}
        />
    )
}