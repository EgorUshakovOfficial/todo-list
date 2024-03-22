import {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../../../context/AuthProvider';
import { validateEmail, validatePassword, validateUsername } from '../../../utils/validate';

export default function useUserSignup(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [errors, setErrors] = useState({ email:'', username:'', password:'' });
    const {setToken, registerUser} = useContext(AuthContext);
    const toast = useToast();
    const navigate = useNavigate();

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

    const profileImageOnChange = event => {
        const file = event.target.files[0];
        if (file){
            setProfileImage(file);
        };
    };

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

    const registerOnSuccess = data => {
        setToken(data.access);
        console.log(data);
        navigate('/dashboard');
    };

    const registerOnError = error => {
        // Handle errors according to the error object here...
        console.error(error);
    };

    const submitUserSignUpForm = () => {
        const userData = {
            email,
            username,
            name,
            password,
            profileImage
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
        profileImage,
        errors,
        nameOnChange,
        emailOnChange,
        usernameOnChange,
        passwordOnChange,
        profileImageOnChange,
        submitUserSignUpForm
    };

};