import React, { useState, useContext } from 'react';
import Modal from "./Modal";
import { TodoContext } from '../contexts/TodoContext';

const Footer = ({ nom }) => {
    //Chargement des variables depuis le contexte ou initialisation des autres variables
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const { setTodos, setCategories, setRelations } = useContext(TodoContext);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    //Recharge la page
    const resetApp = () => {
        localStorage.clear();
        window.location.reload();
    };

    //Chargement des données dans le fichier data.json
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
                setIsDataLoaded(true);

            })
            .catch(error => console.error('Error loading backup:', error));
    };

    //Lance le reset de l'application après l'accord de l'utilisateur
    const handleResetApp = () => {
        if (window.confirm('Voulez vous recharger la page ?')) {
            resetApp();
        }
    };

    //Vérifie si les données sont chargées, si non propose de les charger
    if (!isDataLoaded) {
        if (window.confirm('Voulez vous charger des données ?')) {
            handleLoadBackup();
        }
        setIsDataLoaded(true)
    }

    //Affichage du footer
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