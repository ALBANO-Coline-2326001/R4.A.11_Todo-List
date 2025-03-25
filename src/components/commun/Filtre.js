import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

function Filtre() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { todos, setTodos, todoFiltre, setFiltre, filtreActif, relations, categories } = useContext(TodoContext);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSort = (criteria) => {
        sortTodos(criteria);
        setIsDropdownOpen(false);
    };

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