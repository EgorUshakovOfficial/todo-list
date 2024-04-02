import {useState, useContext} from 'react';
import { useToast } from '@chakra-ui/react';
import {AuthContext} from '../../../context/AuthProvider';
import { updateUser } from '../../../services/userApi';

export default function useAccountDetailsUserDetails(){
    const toast = useToast();
    const {authState, setAuthState} = useContext(AuthContext);
    const user = authState.user;

    const [name, setName] = useState({value:user.name, isReadOnly:true});
    const [email, setEmail] = useState({value:user.email, isReadOnly:true});
    const [username, setUsername] = useState({value:user.username, isReadOnly:true});

    const nameOnChange = event => setName(state => ({...state, value:event.target.value}));
    const emailOnChange = event => setEmail(state => ({...state, value:event.target.value}));
    const usernameOnChange = event => setUsername(state => ({...state, value:event.target.value}));

    const nameOnClick = () => setName(state => ({...state, isReadOnly: !state.isReadOnly}));
    const emailOnClick = () => setEmail(state => ({...state, isReadOnly:!state.isReadOnly}));
    const usernameOnClick = () => setUsername(state => ({...state, isReadOnly:!state.isReadOnly}));

    const updateFieldOnClick = (fieldName, fieldValue) => {
        const data = { [fieldName] : fieldValue };
        const accessToken = authState.token;
        const userOnSuccess = () => {
            if (fieldName === 'email'){
                setEmail(() => ({isReadOnly:true, value:fieldValue}));
                setAuthState(state => ({...state, user:{...state.user, email:fieldValue}}));
            }
            else if (fieldName === 'name'){
                setName(() => ({isReadOnly:true, value:fieldValue}));
                setAuthState(state => ({...state, user:{...state.user, name:fieldValue}}));
            }
            else if (fieldName === 'username'){
                setUsername(() => ({isReadOnly:true, value:fieldValue}));
                setAuthState(state => ({...state, user:{...state.user, username:fieldValue}}));
            }

            toast({
                title: `${fieldName} has been successfully updated!`,
                status:'success',
                isClosable:true
            });
        };

        const userOnError = error => {
            console.log(error);
            toast({
                title: 'Email or password is incorrect',
                status:'error',
                isClosable:true
            });
        }

        updateUser(accessToken, data, userOnSuccess, userOnError);
    }

    return {
        name,
        email,
        username,
        nameOnChange,
        emailOnChange,
        usernameOnChange,
        nameOnClick,
        emailOnClick,
        usernameOnClick,
        updateFieldOnClick
    }

}