import { useContext } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from "@chakra-ui/react";
import { FeaturesContext } from '../context/FeaturesProvider';
import { FeatureDetailsInfoCard } from '../features/edit-projects';
import useModal from "../hooks/useModal";

export default function FeatureModal(){
  const { activeFeature, setActiveFeature } = useContext(FeaturesContext);

  const {isModalOpen, closeModalOnClick} = useModal();

  const featureOnClose = () => {
    closeModalOnClick();
    setActiveFeature(null);
  }

  return (
    <Modal isOpen={isModalOpen} onClose={featureOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FeatureDetailsInfoCard
            id={activeFeature.id}
            name={activeFeature.name}
            description={activeFeature.description}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={featureOnClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
