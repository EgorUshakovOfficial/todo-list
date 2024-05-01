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
import useCreateDeveloperTask from '../hooks/useCreateDeveloperTask';

export default function CreateDeveloperTask(props){
    const createDeveloperTaskProps = useCreateDeveloperTask({ id: props.userStoryId });
    const descriptionError = createDeveloperTaskProps.errors.description;

    return (
        <Accordion
            allowToggle
            borderInline="1px solid #E2E8F0"
            borderRadius="0.25em"
        >
            <AccordionItem>
                <Box as="h2">
                    <AccordionButton onClick={createDeveloperTaskProps.toggleAccordion}>
                        <Box as="span" flex='1' textAlign='left'>
                            Add Task
                        </Box>
                        {createDeveloperTaskProps.isAccordionOpen ? <MinusIcon /> : <AddIcon />}
                    </AccordionButton>
                </Box>
                <AccordionPanel pb={4}>
                    <Box
                        as="form"
                        display="grid"
                        rowGap="0.25em"
                        onSubmit={createDeveloperTaskProps.formOnSubmit}
                    >
                        <FormControl isInvalid={descriptionError}>
                            <Textarea
                                name="description"
                                placeholder="Description"
                                value={createDeveloperTaskProps.description}
                                onChange={createDeveloperTaskProps.descriptionOnChange}
                                mb="1"
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