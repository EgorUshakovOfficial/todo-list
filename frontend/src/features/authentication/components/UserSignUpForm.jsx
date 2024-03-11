import {Box, Input, Button, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import useUserSignup from '../hooks/useUserSignUp';

export default function UserSignUpForm(){
    const userSignUpProps = useUserSignup();

    return (
        <Box maxW='md' mx="auto" mt="8">
            <FormControl>
                <FormLabel>Name:</FormLabel>
                <Input
                    type="text"
                    placeholder="e.g., John Doe"
                    value={userSignUpProps.name}
                    onChange={userSignUpProps.nameOnChange}
                    required
                />
                <FormErrorMessage>{userSignUpProps.errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Email address:</FormLabel>
                <Input
                    type="email"
                    placeholder="e.g, johndoe@example.com"
                    value={userSignUpProps.email}
                    onChange={userSignUpProps.emailOnChange}
                    required
                />
                <FormErrorMessage>{userSignUpProps.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Username</FormLabel>
                <Input
                    type="text"
                    placeholder="e.g., JohnDoe"
                    value={userSignUpProps.username}
                    onChange={userSignUpProps.usernameOnChange}
                    required
                />
                <FormErrorMessage>{userSignUpProps.errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    value={userSignUpProps.password}
                    onChange={userSignUpProps.passwordOnChange}
                    required
                />
                <FormErrorMessage>{userSignUpProps.errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Profile Picture</FormLabel>
                <Button>Choose File</Button>
                <Input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={userSignUpProps.profileImageOnChange}
                />
            </FormControl>
            <Button mt={4} colorScheme="teal">Submit</Button>
            {(userSignUpProps.profileImage !== null) && (
                <Box>
                    <img
                        src={URL.createObjectURL(userSignUpProps.profileImage)}
                        alt="Selected Profile Pic"
                        style={{}}
                    />
                    <Button colorScheme="teal">Upload</Button>
                </Box>
            )}
            <Button mt={4} colorScheme="teal" onClick={userSignUpProps.submitUserSignUpForm}>Submit</Button>
        </Box>
    )
}