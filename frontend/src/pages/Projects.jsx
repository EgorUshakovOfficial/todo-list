import { Head } from "../components";
import { MainLayout } from "../containers/layouts";
import { ProjectsMain, ProjectsProvider } from '../features/create-projects';

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