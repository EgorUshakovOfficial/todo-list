import { Fragment, useContext } from "react";
import {Avatar, Menu, MenuList, MenuItem, MenuButton} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import {UserContext} from '../context/UserProvider';
import { LOGIN_ENDPOINT } from "../constants";

export default function HeaderNavLinks(){
    const {setToken, logout} = useContext(AuthContext);
    const {user} = useContext(UserContext);

    const logoutOnSuccess = () => setToken('');
    const logoutOnError = error => console.log(error);
    const callLogout = () => logout(logoutOnSuccess, logoutOnError);

    return (
        <div>
        { (user === null) ?
            <Fragment>
                <Link to={LOGIN_ENDPOINT}>Log In</Link>
                <Link to="/sign-up">Create an Account</Link>
            </Fragment>
            :
            <Fragment>
                <Link to="/projects">Projects</Link>
                <Menu>
                    <MenuButton>
                        <Avatar name={user.name} src="#" />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <Link to="/profile">
                                Profile
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={callLogout}>
                            Log out
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Fragment>
        }
        </div>
    );
}