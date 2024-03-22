import { Box} from "@chakra-ui/react";
import AccountDetailsUserDetailsRow from "./AccountDetailsUserDetailsRow";
import useAccountDetailsUserDetails from "../hooks/useAccountDetailsUserDetails";

export default function AccountDetailsUserDetails(){
    const userDetailsProps = useAccountDetailsUserDetails();
    const {name, email, username, ...callbackProps} = userDetailsProps;

    return (
        <Box>
            <AccountDetailsUserDetailsRow
                fieldName="Name"
                fieldObj={name}
                fieldOnChange={callbackProps.nameOnChange}
                fieldOnClick={callbackProps.nameOnClick}
                updateFieldValueOnClick={() => {}}
            />
            <AccountDetailsUserDetailsRow
                fieldName="Email"
                fieldObj={email}
                fieldOnChange={callbackProps.emailOnChange}
                fieldOnClick={callbackProps.emailOnClick}
                updateFieldValueOnClick={() => {}}
            />
            <AccountDetailsUserDetailsRow
                fieldName="Username"
                fieldObj={username}
                fieldOnChange={callbackProps.usernameOnChange}
                fieldOnClick={callbackProps.usernameOnClick}
                updateFieldValueOnClick={() => {}}
            />
        </Box>
    );
};