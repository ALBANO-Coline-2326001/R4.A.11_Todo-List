import React, { useState, useContext } from 'react';
import '../../assets/css/footer.css';
import Modal from "./Modal";
import { TodoContext } from '../contexts/TodoContext';

const Footer = ({ nom }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const { setTodos, setCategories, setRelations, categories } = useContext(TodoContext);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const resetApp = () => {
        localStorage.clear();
        window.location.reload();
    };

    const handleLoadBackup = () => {
        fetch('/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTodos(prevTodos => [...prevTodos, ...data.taches]);
                setCategories(prevCategories => [...prevCategories, ...data.categories]);
                setRelations(prevRelations => [...prevRelations, ...data.relations]);
                console.log(categories)
                setIsDataLoaded(true);
            })
            .catch(error => console.error('Error loading backup:', error));
    };

    const handleResetApp = () => {
        if (window.confirm('Voulez vous recharger la page ?')) {
            resetApp();
        }
    };

    return (
        <footer>
            <p>{nom}</p>
            <button onClick={openModal}>+</button>
            {!isDataLoaded && <button onClick={handleLoadBackup}>Load Backup</button>}
            <button onClick={handleResetApp}>Reset</button>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </footer>
    );
};

export default Footer;