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
import { CreateUserStory } from '../features/create-projects';
import { FeatureDetailsInfoCard } from '../features/edit-projects';
import { DeleteFeature } from '../features/delete-projects';
import useFeatureModal from '../hooks/useFeatureModal';

export default function FeatureModal(){
  const { activeFeature } = useContext(FeaturesContext);

  const featureModalProps = useFeatureModal();
  const featureOnClose = featureModalProps.featureOnClose;

  return (
    <Modal isOpen={featureModalProps.isModalOpen} onClose={featureOnClose}>
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
          <CreateUserStory />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="ghost" mr={3} onClick={featureOnClose}>
            Close
          </Button>
          <DeleteFeature id={activeFeature.id} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
