import { Fragment, useContext } from "react";
import {Avatar, Box, Menu, MenuList, MenuItem, MenuButton} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { LOGIN_ENDPOINT } from "../../constants";

export default function HeaderNavLinks(){
    const {authState, setAuthState, logout} = useContext(AuthContext);
    const logoutOnSuccess = () => setAuthState(() => ({token:'', user:null}));
    const logoutOnError = error => console.log(error);
    const callLogout = () => logout(logoutOnSuccess, logoutOnError);

    return (
        <Box
            display="flex"
            alignItems="center"
            gap="0.5em"
        >
        { (authState.user === null) ?
            <Fragment>
                <Link to={LOGIN_ENDPOINT}>Log In</Link>
                <Link to="/sign-up">Create an Account</Link>
            </Fragment>
            :
            <Fragment>
                <Link to="/projects">Projects</Link>
                <Menu>
                    <MenuButton>
                        <Avatar name={authState.user?.name} src="#" />
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
        </Box>
    );
}