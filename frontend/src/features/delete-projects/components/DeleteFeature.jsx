import { Fragment } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react';
import useDeleteFeature from '../hooks/useDeleteFeature';

export default function DeleteFeature({id}){
    const deleteFeatureProps = useDeleteFeature({id});
    const closeDeleteModal = deleteFeatureProps.closeDeleteModal;

    return (
        <Fragment>
            <Button colorScheme="red" onClick={deleteFeatureProps.openDeleteModal}>
                Delete
            </Button>
            <Modal isOpen={deleteFeatureProps.isModalOpen} onClose={deleteFeatureProps.closeDeleteModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure you want to delete this feature?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        You will be <strong>permanently</strong> deleting all associated user stories and developer tasks.
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={deleteFeatureProps.deleteFeatureOnClick}>
                            Yes, Delete
                        </Button>
                        <Button variant="ghost" onClick={closeDeleteModal}>
                            No, Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Fragment>
    );
};