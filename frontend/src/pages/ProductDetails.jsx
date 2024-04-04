import { Box } from '@chakra-ui/react';
import { Head } from "../components";
import { MainLayout } from "../containers/layouts";
import { DeleteProject } from "../features/delete-projects";
import { ProductDetailsInfoCard } from '../features/edit-projects';
import useProductDetails from '../hooks/useProductDetails';

export default function ProjectDetails() {
    const { isLoading, project, error } = useProductDetails();

    return (
        <MainLayout>
            <Head pageTitle="Dashboard" />
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error! Something went wrong.</div>
            ) : (
                <Box>
                    <DeleteProject />
                    <ProductDetailsInfoCard
                        title={project.title}
                        description={project.description}
                    />
                </Box>
            )}
        </MainLayout>
    );
}
