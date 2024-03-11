import {useState} from 'react';

export default function useUserSignup(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [errors, setErrors] = useState([]);

    const nameOnChange = event => setName(event.target.value);
    const emailOnChange = event => setEmail(event.target.value);
    const usernameOnChange = event => setUsername(event.target.value);
    const passwordOnChange = event => setPassword(event.target.value);

    const profileImageOnChange = event => {
        const file = event.target.files[0];

        if (file) setProfileImage(file);
    };

    const submitUserSignUpForm = () => {
        // Handle user registration and validation here...
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
    }

}