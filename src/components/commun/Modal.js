import React, { useContext, useState } from 'react';
import '../../assets/css/modal.css';
import { TodoForm } from "../forms/TodoForm";
import { TodoContext } from "../contexts/TodoContext";

const Modal = ({ isOpen, onClose }) => {
    const { todos, setTodos, categories, setCategories } = useContext(TodoContext);


    const [isTaskForm, setIsTaskForm] = useState(true);
    const [newCategory, setNewCategory] = useState({
        name: "",
        description: "",
        color: "red",
        icon: "" // À compléter plus tard avec les pictogrammes
    });


    const addCategory = () => {
        if (newCategory.name.length >= 3 && !categories.some(cat => cat.name === newCategory.name)) {
            setCategories([...categories, newCategory]);
            setNewCategory({
                name: "",
                description: "",
                color: "red",
                icon: ""
            });
        } else {
            alert("L'intitulé de la catégorie doit avoir au moins 3 caractères.");
        }
    };

    const addTodo = (value, description, urgent, done, date_echeance, contacts, categorie) => {
        const formattedContacts = typeof contacts === 'string' ? contacts.split(' ').map(contact => ({ name: contact })) : [];

        setTodos([
            ...todos,
            {
                id: todos.length + 1,
                value,
                description,
                date_creation: new Date(),
                date_echeance,
                done,
                urgent,
                contacts: formattedContacts,
                categorie,
                isEditing: false
            }
        ]);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {console.log(categories)}

                <h3>Ajouter une Tâche et une Catégorie</h3>
                <div>
                    <button onClick={() => setIsTaskForm(true)}>Ajouter Tâche</button>
                    <button onClick={() => setIsTaskForm(false)}>Ajouter Catégorie</button>
                </div>

                {isTaskForm ? (
                    <TodoForm addTodo={addTodo} categories={categories} />
                ) : (
                    <div>
                        <input
                            type="text"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            placeholder="Nom de la catégorie (min. 3 caractères)"
                        />
                        <textarea
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            placeholder="Description (optionnelle)"
                        />
                        <select
                            value={newCategory.color}
                            onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                        >
                            <option value="red">Rouge</option>
                            <option value="blue">Bleu</option>
                            <option value="green">Vert</option>
                            <option value="yellow">Jaune</option>
                            <option value="purple">Violet</option>
                            <option value="orange">Orange</option>
                            <option value="pink">Rose</option>
                            <option value="black">Noir</option>
                            <option value="gray">Gris</option>
                            <option value="brown">Marron</option>
                        </select>
                        {/* À ajouter plus tard pour les pictogrammes */}
                        <button onClick={addCategory}>Ajouter catégorie</button>
                    </div>
                )}

                <button type="button" onClick={onClose}>Annuler</button>
            </div>
        </div>
    );
};

export default Modal;
