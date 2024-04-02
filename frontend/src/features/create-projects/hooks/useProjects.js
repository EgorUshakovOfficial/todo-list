import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { getProjectWorkflows } from "../../../services/projectApi";

export default function useProjects(){
    const {authState} = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const projectsOnSuccess = response => {
        const retrievedProjects = response?.data?.projects;
        setProjects(state => ([...state, ...retrievedProjects]));
        setIsLoading(false);
    };

    const projectsOnError = error => {
        setIsLoading(false);
        setError(error);
    };

    useEffect(() => {
        const fetchProjects = () => {
            const accessToken = authState.token;
            getProjectWorkflows(accessToken, projectsOnSuccess, projectsOnError);
        }

        fetchProjects();

    }, []);

    return {
        projects,
        isLoading,
        error,
        setProjects,
        setIsLoading,
        setError
    };

}