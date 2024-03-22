import { Head } from "../components";
import { MainLayout } from "../containers/layouts";
import {LogInForm} from '../features/authentication';

export default function LogIn(){
    return (
        <MainLayout>
            <Head pageTitle="Login" />
            <LogInForm />
        </MainLayout>
    );
};