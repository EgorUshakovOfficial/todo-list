import { createContext } from "react";
import { useProjects } from "../features/create-projects/hooks";

const ProjectsContext = createContext({});

const ProjectsProvider = ({children}) => {
    const projectsProps = useProjects();

    return (
        <ProjectsContext.Provider value={{...projectsProps}}>
            {children}
        </ProjectsContext.Provider>
    );
};

export { ProjectsContext, ProjectsProvider };