import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
    Input,
    Textarea,
    Button,
    Form,
    FormControl,
    FormErrorMessage
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import useCreateUserStory from '../hooks/useCreateUserStory';

export default function CreateUserStory(){
    const createUserStoryProps = useCreateUserStory();
    const nameError = createUserStoryProps.errors.name;
    const descriptionError = createUserStoryProps.errors.description;

    return (
        <Accordion
            borderInline="1px solid #E2E8F0"
            borderRadius="0.25em"
            allowToggle
        >
            <AccordionItem>
                <Box as="h2">
                    <AccordionButton onClick={createUserStoryProps.toggleAccordion}>
                        <Box as="span" flex='1' textAlign='left'>
                            Add User Story
                        </Box>
                        {createUserStoryProps.isAccordionOpen ? <MinusIcon /> : <AddIcon />}
                    </AccordionButton>
                </Box>
                <AccordionPanel pb={4}>
                    <Box
                        as="form"
                        display="grid"
                        rowGap="0.25em"
                        onSubmit={createUserStoryProps.formOnSubmit}
                    >
                        <FormControl isInvalid={nameError}>
                            <Input
                                name="name"
                                placeholder="Name"
                                value={createUserStoryProps.name}
                                onChange={createUserStoryProps.nameOnChange}
                            />
                            <FormErrorMessage>{nameError}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={descriptionError}>
                            <Textarea
                                name="description"
                                placeholder="Description"
                                value={createUserStoryProps.description}
                                onChange={createUserStoryProps.descriptionOnChange}
                            />
                            <FormErrorMessage>{descriptionError}</FormErrorMessage>
                        </FormControl>
                        <Button type="submit" colorScheme="blue">
                            Submit
                        </Button>
                    </Box>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};
