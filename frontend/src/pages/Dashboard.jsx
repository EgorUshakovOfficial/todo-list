import { Suspense } from "react";
import { Head } from "../components";
import { MainLayout } from "../containers/layouts";

export default function UserSignUp(){
    return (
        <MainLayout>
            <Head pageTitle="Dashboard" />
            <Suspense>
                <div>Dashboard...</div>
            </Suspense>
        </MainLayout>
    );
};