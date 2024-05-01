import { Fragment } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useCreateProject } from '../hooks';

export default function CreateProject(props) {
  const createProjectProps = useCreateProject();

  const titleError = createProjectProps.errors.title;
  const descriptionError = createProjectProps.errors.description;

  return (
    <Fragment>
      <Button mt="2" onClick={createProjectProps.openModalOnClick}>Create Project</Button>
      <Modal isOpen={createProjectProps.isModalOpen} onClose={createProjectProps.closeModalOnClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4} isInvalid={titleError}>
              <FormLabel>Project Title</FormLabel>
              <Input
                placeholder="Enter project title"
                value={createProjectProps.title}
                onChange={createProjectProps.titleOnChange}
              />
              <FormErrorMessage>{titleError}</FormErrorMessage>
            </FormControl>
            <FormControl mb={4} isInvalid={descriptionError}>
              <FormLabel>Project Description</FormLabel>
              <Textarea
                placeholder="Enter project description"
                value={createProjectProps.description}
                onChange={createProjectProps.descriptionOnChange}
              />
              <FormErrorMessage>{descriptionError}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={createProjectProps.closeModalOnClick}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={createProjectProps.projectFormOnSubmit}>
              Create Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
