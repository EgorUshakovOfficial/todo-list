import { useState, useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../../../context/AuthProvider';
import { ProjectsContext } from '../../../context/ProjectsProvider';
import { createNewProject } from '../../../services/projectApi';
import { PROJECT_IN_PROGRESS_STATUS } from '../../../constants';

export default function useCreateProject(){
    const toast = useToast();
    const { token } = useContext(AuthContext);
    const { setProjects } = useContext(ProjectsContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({ title:'', description:'' });

    const titleOnChange = event => setTitle(event.target.value);
    const descriptionOnChange = event => setDescription(event.target.value);
    const openModalOnClick = () => setIsModalOpen(true);
    const closeModalOnClick = () => {
        setIsModalOpen(false);
        setTitle('');
        setDescription('');
    };

    const validateProjectData = data => {
        const formFieldErrors = {
            title: (data.title === '') ? 'Title is a required field.' : '',
            description: (data.description === '') ? 'Description is a required field.' : ''
        };
        setErrors(state => ({...state, ...formFieldErrors}));
        return Object.values(formFieldErrors).every(value => value === '');
    };

    const newProjectOnSuccess = response => {
        const newProject = response.data;
        setProjects(state => [...state, newProject]);
        toast({
            title: 'New project has been successfully created!',
            status:'success',
            isClosable:true
        });
        closeModalOnClick();
    };

    const newProjectOnError = error => {
        const errorMessage = error?.data?.error?.message
        console.error(`Error has occurred: ${errorMessage}`);
        toast({
            title: errorMessage,
            status:'error',
            isClosable:true
        });
    };

    const projectFormOnSubmit = () => {
        const data = {
            title,
            description,
            status:PROJECT_IN_PROGRESS_STATUS
        };
        if (validateProjectData(data)){
            createNewProject(token, data, newProjectOnSuccess, newProjectOnError);
        }
    }

    return {
        title,
        description,
        errors,
        isModalOpen,
        titleOnChange,
        descriptionOnChange,
        openModalOnClick,
        closeModalOnClick,
        projectFormOnSubmit
    }
}