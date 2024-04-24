import { useContext } from 'react';
import {
    Accordion,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from "@chakra-ui/react";
import { FeaturesContext } from '../../context/FeaturesProvider';
import { UserStoriesProvider } from '../../context/UserStoriesProvider';
import { CreateUserStory } from '../../features/create-projects';
import { FeatureDetailsInfoCard } from '../../features/edit-projects';
import { DeleteFeature } from '../../features/delete-projects';
import UserStoryList from '../userstory/UserStoryList';
import useFeatureModal from '../../hooks/useFeatureModal';

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
          <UserStoriesProvider>
            <Accordion allowToggle>
              <UserStoryList />
              <CreateUserStory />
            </Accordion>
          </UserStoriesProvider>
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
