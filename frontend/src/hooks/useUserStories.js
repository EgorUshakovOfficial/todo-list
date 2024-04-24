import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { FeaturesContext } from '../context/FeaturesProvider';
import { getUserStories } from '../services/userStoryApi';

export default function useUserStories(){
    const { authState } = useContext(AuthContext);
    const { activeFeature } = useContext(FeaturesContext);

    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStories = () => {
            const accessToken = authState.token;
            const featureId = activeFeature.id;

            const storiesOnSuccess = response => {
                const stories = response.data.stories;
                setStories(stories);
                setIsLoading(false);
            };

            const storiesOnError = error => {
                const response = error?.response;
                const errorMessage = response.data.error.message;
                setError(errorMessage);
            };

            getUserStories(featureId, accessToken, storiesOnSuccess, storiesOnError);
        };

        fetchStories();
    }, []);

    return {
        stories,
        setStories,
        isLoading,
        setIsLoading,
        error,
        setError
    };

}