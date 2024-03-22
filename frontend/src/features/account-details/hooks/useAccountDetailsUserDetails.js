import {useState, useContext} from 'react';
import {UserContext} from '../../../context/UserProvider';
import {validateEmail} from '../../../utils/validate';

export default function useAccountDetailsUserDetails(){
    const {user} = useContext(UserContext);

    const [name, setName] = useState({value:user.name, isReadOnly:true});
    const [email, setEmail] = useState({value:user.email, isReadOnly:true});
    const [username, setUsername] = useState({value:user.username, isReadOnly:true});

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