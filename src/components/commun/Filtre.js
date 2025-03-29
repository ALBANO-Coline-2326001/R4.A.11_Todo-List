import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

function Filtre() {
    //Chargement des variables depuis le contexte ou initialisation des autres variables
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { todos, setTodos, todoFiltre, setFiltre, filtreActif, relations, categories } = useContext(TodoContext);

    //Fonction pour ouvrir ou fermer la selection du filtre
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    //Trie des taches
    const handleSort = (criteria) => {
        sortTodos(criteria);
        setIsDropdownOpen(false);
    };

    //Fonction pour trier les taches globales ou les taches filtrées
    const sortTodos = (criteria) => {
        let sortedTodos;
        const getCategoryName = (taskId) => {
            const relation = relations.find(rel => rel.tache === taskId);
            if (relation) {
                const category = categories.find(cat => cat.id === relation.categorie);
                return category ? category.name : '';
            }
            return '';
        };

        if (filtreActif) {
            switch (criteria) {
                case 'alphabetical':
                    sortedTodos = [...todoFiltre].sort((a, b) => a.value.localeCompare(b.value));
                    break;
                case 'creationDate':
                    sortedTodos = [...todoFiltre].sort((a, b) => new Date(a.date_creation) - new Date(b.date_creation));
                    break;
                case 'dueDate':
                    sortedTodos = [...todoFiltre].sort((a, b) => new Date(a.date_echeance) - new Date(b.date_echeance));
                    break;
                case 'category':
                    sortedTodos = [...todoFiltre].sort((a, b) => getCategoryName(a.id).localeCompare(getCategoryName(b.id)));
                    break;
                default:
                    sortedTodos = todoFiltre;
            }
            setFiltre(sortedTodos);
        } else {
            switch (criteria) {
                case 'alphabetical':
                    sortedTodos = [...todos].sort((a, b) => a.value.localeCompare(b.value));
                    break;
                case 'creationDate':
                    sortedTodos = [...todos].sort((a, b) => new Date(a.date_creation) - new Date(b.date_creation));
                    break;
                case 'dueDate':
                    sortedTodos = [...todos].sort((a, b) => new Date(a.date_echeance) - new Date(b.date_echeance));
                    break;
                case 'category':
                    sortedTodos = [...todos].sort((a, b) => getCategoryName(a.id).localeCompare(getCategoryName(b.id)));
                    break;
                default:
                    sortedTodos = todos;
            }
            setTodos(sortedTodos);
        }
    };

    //Affichage du bouton de filtre et du menu déroulant
    return (
        <div>
            <button className="filter-button" onClick={toggleDropdown}>
                <img src="../../../public/filtre.png" alt="Filter" />
            </button>
            {isDropdownOpen && (
                <ul className="filter-dropdown">
                    <li onClick={() => handleSort('alphabetical')}>Ordre alphabétique</li>
                    <li onClick={() => handleSort('creationDate')}>Date de création</li>
                    <li onClick={() => handleSort('dueDate')}>Échéance</li>
                    <li onClick={() => handleSort('category')}>Catégorie</li>
                </ul>
            )}
        </div>
    );
}

export default Filtre;