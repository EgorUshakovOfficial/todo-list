import { Fragment } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { useDeleteProduct } from '../hooks';

export default function DeleteProject(){
    const deleteProductProps = useDeleteProduct();

    return (
        <Fragment>
            <Button colorScheme="red" onClick={deleteProductProps.openModelOnClick}>
                Delete Project
            </Button>
            <Modal isOpen={deleteProductProps.isModelOpen} onClose={deleteProductProps.closeModelOnClick}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure you want to delete this project?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        You will be <strong>permanently</strong> deleting all associated features, user stories, and developer tasks.
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={deleteProductProps.deleteProjectOnClick}>
                            Yes, Delete
                        </Button>
                        <Button variant="ghost" onClick={deleteProductProps.closeModelOnClick}>
                            No, Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Fragment>
    );
};