import React, { useState } from 'react';

export const TodoForm = ({ addTodo, categories }) => {
    const [donnees, setDonnees] = useState({
        value: '',
        description: '',
        urgent: false,
        done: false,
        date_echeance: '',
        contacts: [],
        categorie: categories.length > 0 ? categories[0].name : '' // Catégorie par défaut
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDonnees({
            ...donnees,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (donnees.value) {
            const selectedCategory = categories.find(cat => cat.name === donnees.categorie);
            addTodo(donnees.value, donnees.description, donnees.urgent, donnees.done, donnees.date_echeance, donnees.contacts, selectedCategory);
            setDonnees({
                value: '',
                description: '',
                urgent: false,
                done: false,
                date_echeance: '',
                contacts: [],
                categorie: categories.length > 0 ? categories[0].name : ''
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input
                type="text"
                name="value"
                value={donnees.value}
                onChange={handleChange}
                className="todo-input"
                placeholder="Ajouter une tâche"
            />
            <textarea
                name="description"
                value={donnees.description}
                onChange={handleChange}
                className="todo-input"
                placeholder="Ajouter une description"
            />
            <textarea
                name="contacts"
                value={donnees.contacts}
                onChange={handleChange}
                className="todo-input"
                placeholder="Ajouter des contacts"
            />
            <input
                type="date"
                name="date_echeance"
                className="todo-input"
                value={donnees.date_echeance}
                onChange={handleChange}
            />
            <label>Urgent: <input type="checkbox" name="urgent" checked={donnees.urgent} onChange={handleChange}/></label>
            <label>Statut: <input type="checkbox" name="done" checked={donnees.done} onChange={handleChange}/></label>

            {categories.length > 0 && (
                <label>
                    Catégorie:
                    <select name="categorie" value={donnees.categorie} onChange={handleChange}>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </label>
            )}

            <button type="submit" className="todo-btn">Ajouter</button>
        </form>
    );
};
