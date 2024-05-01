import { Fragment } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import useDeleteUser from '../hooks/useDeleteUser';

export default function AccountDetailsDeleteAccount(){
    const deleteUserProps = useDeleteUser();

    return (
        <Fragment>
            <Button mt="2" colorScheme="red" onClick={deleteUserProps.openDeleteUserModal}>
                Delete
            </Button>
            <Modal isOpen={deleteUserProps.deleteUserModalOpen} onClose={deleteUserProps.closeDeleteUserModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete this user?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={deleteUserProps.deleteUserOnClick}>
                            Yes, Delete
                        </Button>
                        <Button variant="ghost" onClick={deleteUserProps.closeDeleteUserModal}>
                            No, Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Fragment>
    );
};