import { createContext } from 'react';
import useUserStories from '../hooks/useUserStories';

const UserStoriesContext = createContext({});

const UserStoriesProvider = ( { children } ) => {
    const userStoriesProps = useUserStories();

    return (
        <UserStoriesContext.Provider value={{...userStoriesProps}}>
            {children}
        </UserStoriesContext.Provider>
    );
};

export { UserStoriesContext, UserStoriesProvider };