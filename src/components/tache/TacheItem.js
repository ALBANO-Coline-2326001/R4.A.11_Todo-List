import React, { useState } from "react";
import '../../assets/css/tacheItem.css';

const TacheItem = ({ task , deleteTodo, editTodo, toggleComplete}) => {
    const [detailsVisible, setDetailsVisible] = useState(false);

    const categoryClass = task.categorie ? `category-${task.categorie.color}` : '';
    return (
        <li className={`task-item ${categoryClass}`} onClick={() => setDetailsVisible(!detailsVisible)}>
            <p className={`${task.done ? "completed" : "incompleted"}`} onClick={(e) => {e.stopPropagation(); toggleComplete(task.id);}}>
                {task.value}</p>
            <p><strong>Date d'échéance:</strong> {new Date(task.dateEcheance).toLocaleDateString()}</p>
            <div>
                <button className="edit-icon" onClick={() => editTodo(task.id)}>Edit</button>
            </div>

            {detailsVisible && (
                <div className="task-details">
                    <p><strong>Description:</strong> {task.description || "Aucune description"}</p>
                    <p><strong>Date de création:</strong> {new Date(task.dateCreation).toLocaleDateString()}</p>
                    <p><strong>Urgent:</strong> {task.urgent ? "Oui" : "Non"}</p>
                    <p><strong>Statut:</strong> {task.done ? "Oui" : "Non"}</p>
                    <p><strong>Contacts:</strong> {task.contacts || "Aucun contact"}</p>
                    <button className="delete-icon" onClick={() => deleteTodo(task.id)}>Supprimer</button>
                </div>
            )}
        </li>
    );
};

export default TacheItem;
