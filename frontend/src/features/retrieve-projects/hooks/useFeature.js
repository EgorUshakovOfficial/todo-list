import { useContext } from 'react';
import { FeaturesContext } from '../../../context/FeaturesProvider';

export default function useFeature(initialState){
    const { setActiveFeature } = useContext(FeaturesContext);

    const updateActiveFeatureOnClick = () => setActiveFeature(initialState);

    return { updateActiveFeatureOnClick };
}