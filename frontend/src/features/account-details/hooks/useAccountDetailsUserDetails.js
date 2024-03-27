import {useState, useContext} from 'react';
import {AuthContext} from '../../../context/AuthProvider';
import {validateEmail} from '../../../utils/validate';

export default function useAccountDetailsUserDetails(){
    const {authState} = useContext(AuthContext);

    const [name, setName] = useState({value:authState.user.name, isReadOnly:true});
    const [email, setEmail] = useState({value:authState.user.email, isReadOnly:true});
    const [username, setUsername] = useState({value:authState.user.username, isReadOnly:true});

    const nameOnChange = event => setName(state => ({...state, value:event.target.value}));
    const emailOnChange = event => setEmail(state => ({...state, value:event.target.value}));
    const usernameOnChange = event => setUsername(state => ({...state, value:event.target.value}));

    const nameOnClick = () => setName(state => ({...state, isReadOnly: !state.isReadOnly}));
    const emailOnClick = () => setEmail(state => ({...state, isReadOnly:!state.isReadOnly}));
    const usernameOnClick = () => setUsername(state => ({...state, isReadOnly:!state.isReadOnly}));

    return {
        name,
        email,
        username,
        nameOnChange,
        emailOnChange,
        usernameOnChange,
        nameOnClick,
        emailOnClick,
        usernameOnClick
    }

}