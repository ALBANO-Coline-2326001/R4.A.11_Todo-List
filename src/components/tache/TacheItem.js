import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

//Affihcage d'une tache
const TacheItem = ({ task, deleteTodo, editTodo, toggleComplete }) => {
    //Chargement des variables depuis le contexte ou initialisation des autres variables
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const { relations, categories, setRelations } = useContext(TodoContext);

    //Fonction pour lister les catégories d'une tâche
    const listCatTask = (id) => {
        return relations
            .filter(relation => relation.tache === id)
            .map(relation => categories.find(cat => cat.id === relation.categorie))
            .filter(cat => cat !== undefined);
    };

    //Fonction pour supprimer une catégorie à une tâche
    const removeCategory = (taskId, categoryId) => {
        setRelations(prevRelations => prevRelations.filter(relation => !(relation.tache === taskId && relation.categorie === categoryId)));
    };

    //Fonction pour ajouter une catégorie à une tâche
    const addCategory = (taskId, categoryId) => {
        setRelations(prevRelations => [...prevRelations, { tache: taskId, categorie: categoryId }]);
        setShowAddCategory(false);
    };


    //Mise à jour des variables
    const taskCategories = listCatTask(task.id);
    const displayedCategories = detailsVisible ? taskCategories : taskCategories.slice(0, 2);
    const availableCategories = categories.filter(cat => !taskCategories.some(taskCat => taskCat.id === cat.id));

    //Affichage d'une tâche, quand on clic dessus, son détail apparait ou disparait
    //On affiche aussi les catégories de la tache
    return (
        <li className="task-item" onClick={() => setDetailsVisible(!detailsVisible)}>
            <p className={`${task.done ? "completed" : "incompleted"}`} onClick={(e) => { e.stopPropagation(); toggleComplete(task.id); }}>
                {task.value}</p>
            <p><strong>Date d'échéance:</strong> {new Date(task.date_echeance).toLocaleDateString()}</p>
            <div>
                <button className="edit-icon" onClick={() => editTodo(task.id)}>Edit</button>
            </div>

            {!detailsVisible && (
                <div className= "task-categories" >
                {displayedCategories.map(cat => (
                    <span key={cat.id} className={`category-item category-${cat.color}`}>
                        {cat.name + " "}
                    </span>
                ))}
            </div>
            )
            }


            {detailsVisible && (
                <div>
                    <div className="task-categories">
                        {taskCategories.map(cat => (
                            <span key={cat.id}  className={`category-item category-${cat.color}`}>
                                {cat.name}
                                <button onClick={(e) => { e.stopPropagation(); removeCategory(task.id, cat.id); }}>✖</button>
                            </span>
                        ))}
                        {availableCategories.length > 0 && (
                            <button onClick={(e) => { e.stopPropagation(); setShowAddCategory(!showAddCategory); }}>+</button>
                        )}
                        {showAddCategory && (
                            <div className="add-category-dropdown">
                                {availableCategories.map(cat => (
                                    <div key={cat.id} onClick={(e) => { e.stopPropagation(); addCategory(task.id, cat.id); }}>
                                        {cat.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div  className="task-details">
                        <button className="delete-icon" onClick={() => deleteTodo(task.id)}>Supprimer</button>

                        <p><strong>Description:</strong> {task.description || "Aucune description"}</p>
                        <p><strong>Date de création:</strong> {new Date(task.date_creation).toLocaleDateString()}</p>
                        <p><strong>Urgent:</strong> {task.urgent ? "Oui" : "Non"}</p>
                        <p><strong>Statut:</strong> {task.done ? "Oui" : "Non"}</p>
                        {task.contacts && task.contacts.length > 0 && (
                            <div>
                                <label><strong>Contacts:</strong></label>
                                <ul>
                                    {task.contacts.map((contact, index) => (
                                        <li key={index}>{contact.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </li>
    );
};

export default TacheItem;