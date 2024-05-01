import {useContext, useState} from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import { validateEmail, validatePassword, validateUsername } from '../../../utils/validate';
import { getUser } from '../../../services/userApi';

export default function useUserSignup(){
    const navigate = useNavigate();

    const toast = useToast();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email:'', username:'', password:'' });
    const {registerUser, setAuthState} = useContext(AuthContext);


    const nameOnChange = event =>  {
        setErrors(({name, ...otherErrors}) => ({name:'', ...otherErrors}));
        setName(event.target.value);
    };

    const emailOnChange = event => {
        setErrors(({email, ...otherErrors}) => ({email:'', ...otherErrors}));
        setEmail(event.target.value);
    };

    const usernameOnChange = event => {
        setErrors(({username, ...otherErrors}) => ({username:'', ...otherErrors}));
        setUsername(event.target.value);
    };

    const passwordOnChange = event => {
        setErrors(({password, ...otherErrors}) => ({password:'', ...otherErrors}));
        setPassword(event.target.value);
    }

    const validateUserData = data => {
        // Initialize form field errors for user data
        const formFieldErrors = {
            email: validateEmail(data.email) ? '' : 'Invalid username. Please enter a valid username.',
            username: validateUsername(data.username) ? '' : 'Invalid username. Please ensure it only contains lowercase or uppercase letters, numbers, and underscores.',
            password: validatePassword(data.password) ? '' :  'Invalid password. Please ensure it is at least 8 characters long.'
        };

        setErrors(formFieldErrors);

        return Object.values(formFieldErrors).some(value => value === '');
    };

    const registerOnSuccess = response => {
        const token = response.data.access;
        const fetchUser = () => {
            const userOnSuccess = response => {
                const user = response.data;
                setAuthState(() => ({user:{...user}, token}));
                navigate('/dashboard');
            };

            const userOnError = error => console.error(error);

            getUser(token, userOnSuccess, userOnError);
        };

        fetchUser();
    };

    const registerOnError = () => {
        toast({
            title: 'Something went wrong! Please try again.',
            status:'error',
            isCloseable:true
        });
    };

    const submitUserSignUpForm = () => {
        const userData = {
            email,
            username,
            name,
            password
        };

        if (validateUserData(userData) === false){
            return;
        };

        registerUser(userData, registerOnSuccess, registerOnError);

        // Reset the states of name, email, username, and password
        setName('');
        setUsername('');
        setEmail('');
        setPassword('');
    };


    return {
        name,
        email,
        username,
        password,
        errors,
        nameOnChange,
        emailOnChange,
        usernameOnChange,
        passwordOnChange,
        submitUserSignUpForm
    };

};