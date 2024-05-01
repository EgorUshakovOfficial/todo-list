import { Box } from '@chakra-ui/react';
import HeaderLogo from "./HeaderLogo";
import HeaderNavLinks from "./HeaderNavLinks";

export default function Header(){
    return (
        <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingBlock="0.5em"
        >
            <HeaderLogo />
            <HeaderNavLinks />
        </Box>
    )
}