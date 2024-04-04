import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { getProjectDetails } from "../services/projectApi";

export default function useProjectDetails(){
    const { authState } = useContext(AuthContext);
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const projectOnSuccess = response => {
            const projectData = response.data;
            setProject(projectData);
            setIsLoading(false);
        };

        const projectOnError = error => {
            const response = error?.response;

            // If no project details is found in the database, redirect the user back to the projects page
            if (response.status === 404){
                navigate('/projects');
            }

            setError(response.data.error);
            setIsLoading(false);
        };

        const accessToken = authState.token;

        getProjectDetails(projectId, accessToken, projectOnSuccess, projectOnError);

    }, []);

    return {
        isLoading,
        project,
        error
    }
}