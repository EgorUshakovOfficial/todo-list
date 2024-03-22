import { Container } from '@chakra-ui/react';
import { Header } from "../../components";
import { UserProvider } from '../../context/UserProvider';

export default function MainLayout({children}){
    return (
        <UserProvider>
            <Container maxW="container.xl" centerContent>
                <Header />
                {children}
            </Container>
        </UserProvider>
    );
}