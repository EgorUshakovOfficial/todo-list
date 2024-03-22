import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import {validateEmail, validatePassword} from '../../../utils/validate';
import { AuthContext } from '../../../context/AuthProvider';
import { MIN_PASSWORD_LENGTH } from '../../../constants';

export default function useLogInForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({email:'', password:''});
    const { login, setToken } = useContext(AuthContext);
    const toast = useToast();
    const navigate = useNavigate();

    const emailOnChange = event => {
        setErrors(errors => {
            const {email, ...otherErrors} = errors;
            return {email: '', ...otherErrors};
        });
        setEmail(event.target.value);
    };

    const passwordOnChange = event => {
        setErrors(errors => {
            const {password, ...otherErrors} = errors;
            return {password:'', ...otherErrors};
        });
        setPassword(event.target.value);
    };

    const validateLoginData = loginData => {
        const formFieldErrors = {
            email: validateEmail(loginData.email) ? '' : 'Invalid email address. Please enter a valid email format.',
            password: validatePassword(loginData.password) ? '' : `Password is too weak! Please enter in at least ${MIN_PASSWORD_LENGTH} characters.`
        };

        setErrors(formFieldErrors);

        return Object.values(formFieldErrors).some(value => value === '');
    };

    const loginOnSuccess = data => {
        setToken(data.access);
        navigate('/dashboard');
    };

    const loginOnError = error => {
        toast({
            title: 'Email or password is incorrect',
            status:'error',
            isClosable:true
        });
    };

    const submitLogInForm = () => {
        const loginData = { email, password };

        if (validateLoginData(loginData) === false){
            return;
        }

        login(email, password, loginOnSuccess, loginOnError);

        setEmail('');
        setPassword('');
    };

    return {
        email,
        password,
        errors,
        emailOnChange,
        passwordOnChange,
        submitLogInForm
    };
};