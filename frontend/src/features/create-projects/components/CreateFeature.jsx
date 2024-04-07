import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
    Input,
    Textarea,
    Button,
    FormControl,
    FormErrorMessage
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useCreateFeature } from '../hooks';

export default function CreateFeature(){
    const createFeatureProps = useCreateFeature();

    const errors = createFeatureProps.errors;
    const nameError = errors.name;
    const descriptionError = errors.description;

    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton onClick={createFeatureProps.toggleAccordion}>
                        <Box as="span" flex='1' textAlign='left'>
                            Add Feature
                        </Box>
                        {createFeatureProps.isAccordionOpen ? <MinusIcon /> : <AddIcon />}
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <form onSubmit={createFeatureProps.formOnSubmit}>
                        <FormControl isInvalid={nameError}>
                            <Input
                                name="name"
                                placeholder="Name"
                                value={createFeatureProps.name}
                                onChange={createFeatureProps.nameOnChange}
                                mb={4}
                            />
                            <FormErrorMessage>{nameError}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={descriptionError}>
                            <Textarea
                                name="description"
                                placeholder="Description"
                                value={createFeatureProps.description}
                                onChange={createFeatureProps.descriptionOnChange}
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
