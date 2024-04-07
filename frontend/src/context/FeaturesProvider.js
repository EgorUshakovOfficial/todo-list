import { createContext } from "react";
import useFeatures from '../hooks/useFeatures';

const FeaturesContext = createContext({});

const FeaturesProvider = ({children}) => {
    const featuresProps = useFeatures();

    return (
        <FeaturesContext.Provider value={{...featuresProps}}>
            {children}
        </FeaturesContext.Provider>
    );
}

export { FeaturesContext, FeaturesProvider };