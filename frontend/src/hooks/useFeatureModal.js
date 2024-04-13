import { useContext, useState } from 'react';
import { FeaturesContext } from '../context/FeaturesProvider';

export default function useFeatureModal(){
    const { setActiveFeature } = useContext(FeaturesContext);

    const [isModalOpen, setIsModalOpen] = useState(true);

    const closeModalOnClick = () => setIsModalOpen(false);

    const featureOnClose = () => {
      closeModalOnClick();
      setActiveFeature(null);
    };

    return {
        isModalOpen,
        closeModalOnClick,
        featureOnClose
    };
}