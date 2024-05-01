import { useContext } from 'react';
import { UserStoriesContext } from '../../context/UserStoriesProvider';
import { Box, Text } from '@chakra-ui/react';
import { UserStory } from "..";

export default function UserStoryList(){
    const { isLoading, error, stories } = useContext(UserStoriesContext);

    if (isLoading){
        return <div>Loading...</div>;
    }

    else if (error){
        return <p>Something went wrong! {error}</p>;
    }

    return (
        <Box
            display="grid"
            rowGap="0.25em"
            marginBlock="1em"
        >
            {(stories.length === 0) ?
                <Text>No stories are currently available.</Text>
                :
                stories.map(story => (
                    <UserStory
                        key={story.id}
                        id={story.id}
                        name={story.name}
                        description={story.description}
                        tasks={story.tasks}
                    />
                ))
            }
        </Box>
    );
}