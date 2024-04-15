import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
    Textarea,
    Button,
    FormControl,
    FormErrorMessage
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import useCreateUserStory from '../hooks/useCreateUserStory';

export default function CreateUserStory(){
    const createUserStoryProps = useCreateUserStory();
    const descriptionError = createUserStoryProps.errors.description;

    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton onClick={createUserStoryProps.toggleAccordion}>
                        <Box as="span" flex='1' textAlign='left'>
                            Add User
                        </Box>
                        {createUserStoryProps.isAccordionOpen ? <MinusIcon /> : <AddIcon />}
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <form onSubmit={createUserStoryProps.formOnSubmit}>
                        <FormControl isInvalid={descriptionError}>
                            <Textarea
                                name="description"
                                placeholder="Description"
                                value={createUserStoryProps.description}
                                onChange={createUserStoryProps.descriptionOnChange}
                                mb={4}
                            />
                            <FormErrorMessage>{descriptionError}</FormErrorMessage>
                        </FormControl>
                        <Button type="submit" colorScheme="blue">
                            Submit
                        </Button>
                    </form>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};
