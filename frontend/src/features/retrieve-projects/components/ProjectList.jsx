import { Fragment, useContext } from 'react';
import { Text } from '@chakra-ui/react';
import { ProjectsContext } from '../../../context/ProjectsProvider';
import Project from './Project';

export default function ProjectList() {
    const { projects, isLoading, error } = useContext(ProjectsContext);

    return (
        <Fragment>
            {isLoading
                ? <div>Loading...</div>
                : error
                    ? <p>{error}</p>
                    : (projects.length >= 1) ?
                        projects.map(projectProps => (
                            <Project key={projectProps.id} {...projectProps} />
                        ))
                        :<Text mt="3" as="p">No projects have been created!</Text>
            }
        </Fragment>
    );
}
