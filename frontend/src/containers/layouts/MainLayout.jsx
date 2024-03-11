import { Container } from '@chakra-ui/react';
import { Header } from "../../components";

export default function MainLayout({children}){
    return (
        <Container maxW="container.xl" centerContent>
            <Header />
            {children}
        </Container>
    );
}