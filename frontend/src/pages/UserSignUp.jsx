import { Head } from "../components";
import { MainLayout } from "../containers/layouts";
import { UserSignUpForm } from "../features/authentication";

export default function UserSignUp(){
    return (
        <MainLayout>
            <Head pageTitle="Registration" />
            <h2>Create an Account</h2>
            <UserSignUpForm />
        </MainLayout>
    );
};