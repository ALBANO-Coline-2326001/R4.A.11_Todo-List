import React, { useState, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

//Formulaire pour ajouter une tâche
const TodoForm = () => {
    //Chargement des variables depuis le contexte ou initialisation des autres variables
    const { todos, setTodos, categories, relations, setRelations } = useContext(TodoContext);
    const [donneTache, setDonneTache] = useState({
        value: '',
        description: '',
        urgent: false,
        done: false,
        date_echeance: '',
        contacts: '',
        selectedCategories: []
    });

    //Traduction des données dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'selectedCategories') {
            const categoryId = parseInt(value);
            setDonneTache(prevData => ({
                ...prevData,
                selectedCategories: checked
                    ? [...prevData.selectedCategories, categoryId]
                    : prevData.selectedCategories.filter(id => id !== categoryId)
            }));
        } else {
            setDonneTache(prevData => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    //Récupère les données dans les champs du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        if (donneTache.value) {
            const newTodo = {
                id: todos.length + 1,
                value: donneTache.value,
                description: donneTache.description,
                date_creation: new Date(),
                date_echeance: donneTache.date_echeance,
                done: donneTache.done,
                urgent: donneTache.urgent,
                contacts: donneTache.contacts.split(' ').map(name => ({ name })),
                isEditing: false
            };

            setTodos([...todos, newTodo]);

            const newRelations = donneTache.selectedCategories.map(categoryId => ({
                tache: newTodo.id,
                categorie: categoryId
            }));
            setRelations([...relations, ...newRelations]);

            setDonneTache({
                value: '',
                description: '',
                urgent: false,
                done: false,
                date_echeance: '',
                contacts: '',
                selectedCategories: []
            });
        }
    };

    //Affichage du formulaire
    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input
                type="text"
                name="value"
                value={donneTache.value}
                onChange={handleChange}
                className="todo-input"
                placeholder="Ajouter une tâche"
            />
            <textarea
                name="description"
                value={donneTache.description}
                onChange={handleChange}
                className="todo-input"
                placeholder="Ajouter une description"
            />
            <textarea
                name="contacts"
                value={donneTache.contacts}
                onChange={handleChange}
                className="todo-input"
                placeholder="Ajouter des contacts"
            />
            <input
                type="date"
                name="date_echeance"
                className="todo-input"
                value={donneTache.date_echeance}
                onChange={handleChange}
            />
            <label>Urgent: <input type="checkbox" name="urgent" checked={donneTache.urgent} onChange={handleChange} /></label>
            <label>Statut: <input type="checkbox" name="done" checked={donneTache.done} onChange={handleChange} /></label>

            {categories.length > 0 && (
                <div>
                    <label>Catégories:</label>
                    {categories.map(cat => (
                        <div key={cat.id}>
                            <input
                                type="checkbox"
                                name="selectedCategories"
                                value={cat.id}
                                checked={donneTache.selectedCategories.includes(cat.id)}
                                onChange={handleChange}
                            />
                            {cat.name}
                        </div>
                    ))}
                </div>
            )}

            <button type="submit" className="todo-btn">Ajouter</button>
        </form>
    );
};

export default TodoForm;