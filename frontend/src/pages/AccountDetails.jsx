import { Head } from "../components";
import { MainLayout } from "../containers/layouts";
import { AccountDetailsMain } from "../features/account-details";

export default function AccountDetails(){
    return (
        <MainLayout>
            <Head pageTitle="Account Details" />
            <AccountDetailsMain />
        </MainLayout>
    );
};