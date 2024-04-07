import { Head } from "../components";
import { MainLayout } from "../containers/layouts";
import  { ProjectsProvider } from "../context/ProjectsProvider";
import { ProjectsMain } from '../components';

export default function Projects(){
    return (
        <MainLayout>
            <Head pageTitle="Dashboard" />
            <ProjectsProvider>
                <ProjectsMain />
            </ProjectsProvider>
        </MainLayout>
    );
};