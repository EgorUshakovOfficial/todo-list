import { useState } from 'react';

export default function useModal(){
    const [isModalOpen, setIsModalOpen] = useState(true);

    const openModalOnClick = () => setIsModalOpen(true);
    const closeModalOnClick = () => setIsModalOpen(false);

    return {
        isModalOpen,
        openModalOnClick,
        closeModalOnClick
    };
}