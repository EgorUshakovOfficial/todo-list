import { useContext } from 'react';
import {Box, Heading, Text} from '@chakra-ui/react';
import AccountDetailsUserDetails from './AccountDetailsUserDetails';
import {AuthContext} from '../../../context/AuthProvider';
import AccountDetailsDeleteAccount from './AccountDetailsDeleteAccount';

export default function AccountDetailsMain(){
    const {authState} = useContext(AuthContext);

    return (
        <Box>
            <Heading as="h2" size="lg" mt="4">
                Account Details
            </Heading>
            <Text mt="4">
                Welcome {authState.user.name}! You can manage your account details here!
            </Text>
            <Box>
            <AccountDetailsUserDetails />
            <AccountDetailsDeleteAccount />
            </Box>
        </Box>
    )
}