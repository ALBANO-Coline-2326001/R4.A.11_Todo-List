import React, {useContext, useState} from 'react';
import '../../assets/css/footer.css';
import Modal from "./Modal";
import {TodoContext} from "../contexts/TodoContext";
const Footer = ({nom}) => {
    const { todos, setTodos } = useContext(TodoContext);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false)


    return (
        <footer>
            <p>{nom}</p>
            <button onClick={openModal}>+</button>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </footer>
    );
};

export default Footer;