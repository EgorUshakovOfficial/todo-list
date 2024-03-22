import { Box, Input, Button, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import useLogInForm from '../hooks/useLogInForm';
import { MIN_PASSWORD_LENGTH } from '../../../constants';

export default function LogInForm() {
  const logInFormProps = useLogInForm();

  return (
    <Box maxW='md' mx="auto" mt="8">
      <FormControl isInvalid={logInFormProps.errors.email}>
        <FormLabel>Email:</FormLabel>
        <Input
          type="email"
          placeholder="e.g., johndoe@example.com"
          value={logInFormProps.email}
          onChange={logInFormProps.emailOnChange}
          required
        />
        {logInFormProps.errors.email && <FormErrorMessage>Invalid email address. Please enter a valid email format.</FormErrorMessage> }
      </FormControl>
      <FormControl mt="4" isInvalid={logInFormProps.errors.password}>
        <FormLabel>Password:</FormLabel>
        <Input
          type="password"
          value={logInFormProps.password}
          onChange={logInFormProps.passwordOnChange}
          required
        />
        {logInFormProps.errors.password && <FormErrorMessage>Password is too weak! Please enter in at least {MIN_PASSWORD_LENGTH} characters.</FormErrorMessage>}
      </FormControl>
      <Button onClick={logInFormProps.submitLogInForm} mt="4">
        Log in
      </Button>
    </Box>
  );
}