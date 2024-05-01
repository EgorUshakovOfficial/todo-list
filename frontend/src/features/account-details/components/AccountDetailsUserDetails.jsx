import { Box} from "@chakra-ui/react";
import { EditField } from '../../../components';
import useAccountDetailsUserDetails from "../hooks/useAccountDetailsUserDetails";

export default function AccountDetailsUserDetails(){
    const userDetailsProps = useAccountDetailsUserDetails();
    const {name, email, username, ...callbackProps} = userDetailsProps;

    return (
        <Box mt="2">
            <EditField
                fieldName="name"
                fieldObj={name}
                fieldOnChange={callbackProps.nameOnChange}
                fieldOnClick={callbackProps.nameOnClick}
                updateFieldValueOnClick={() => callbackProps.updateFieldOnClick('name', name.value)}
            />
            <EditField
                fieldName="email"
                fieldObj={email}
                fieldOnChange={callbackProps.emailOnChange}
                fieldOnClick={callbackProps.emailOnClick}
                updateFieldValueOnClick={() => callbackProps.updateFieldOnClick('email', email.value)}
            />
            <EditField
                fieldName="username"
                fieldObj={username}
                fieldOnChange={callbackProps.usernameOnChange}
                fieldOnClick={callbackProps.usernameOnClick}
                updateFieldValueOnClick={() => callbackProps.updateFieldOnClick('username', username.value)}
            />
        </Box>
    );
};