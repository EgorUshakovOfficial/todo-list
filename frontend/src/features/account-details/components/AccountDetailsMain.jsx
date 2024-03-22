import { useContext } from 'react';
import {Box, Heading, Text} from '@chakra-ui/react';
import AccountDetailsUserDetails from './AccountDetailsUserDetails';
import {UserContext} from '../../../context/UserProvider';

export default function AccountDetailsMain(){
    const {user} = useContext(UserContext);

    return (
        <Box>
            <Heading as="h2" size="lg" mt="4">
                Account Details
            </Heading>
            <Text mt="4">
                Welcome {user.name}! You can manage your account details here!
            </Text>
            <Box>
                <AccountDetailsUserDetails />
            </Box>
        </Box>
    )
}