import React, { useState } from 'react';

export const EditTodoForm = ({ editTask, task }) => {
    const [donnees, setDonnees] = useState({
        value: task.value,
        description: task.description,
        urgent: task.urgent,
        done: task.done,
        date_echeance: task.date_echeance,
        contacts: task.contacts.map(contact => contact.name).join(' '),
        categorie: task.categorie
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
            editTask(task.id, donnees.value, donnees.description, donnees.urgent, donnees.done, donnees.date_echeance, donnees.contacts, donnees.categorie, task);
            setDonnees({
                value: '',
                description: '',
                urgent: false,
                done: false,
                date_echeance: '',
                contacts: []
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input type="text" name="value" value={donnees.value} onChange={handleChange} className="todo-input" placeholder="Ajouter une tache" />
            <textarea name="description" value={donnees.description} onChange={handleChange} className="todo-input" placeholder="Ajouter une description" />
            <textarea name="contacts" value={donnees.contacts} onChange={handleChange} className="todo-input" placeholder="Ajouter des contacts" />
            <input type="date" name="date_echeance" className="todo-input" value={donnees.date_echeance} onChange={handleChange} />

            <label>Urgent:
                <input type="checkbox" name="urgent" checked={donnees.urgent} onChange={handleChange} />
            </label>

            <label>Statut:
                <input type="checkbox" name="done" checked={donnees.done} onChange={handleChange} />
            </label>

            <button type="submit" className="todo-btn">Editez</button>
        </form>
    );
};