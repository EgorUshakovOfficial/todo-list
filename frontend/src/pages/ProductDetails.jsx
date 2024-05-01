import { Fragment } from 'react';
import { Box } from '@chakra-ui/react';
import { Head, ProjectDetailsFeatureSection } from "../components";
import { FeaturesProvider } from '../context/FeaturesProvider';
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
                <Fragment>
                    <Box
                        width="100%"
                        display="flex"
                        flexDirection="row-reverse"
                        justifyContent="space-between"
                    >
                        <DeleteProject />
                        <ProductDetailsInfoCard
                            title={project.title}
                            description={project.description}
                        />
                    </Box>
                    <FeaturesProvider>
                        <ProjectDetailsFeatureSection />
                    </FeaturesProvider>
                </Fragment>
            )}
        </MainLayout>
    );
}
