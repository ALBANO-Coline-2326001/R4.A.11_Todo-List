import React, {useContext, useState} from 'react';
import '../../assets/css/filter.css';
import Recherche from "./Recherche";
import EnCoursEffectuer from "./EnCoursEffectuer";
import {TodoContext} from "../contexts/TodoContext";


const Filter = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { todos, setTodos, todoFiltre, setFiltre, filtreActif } = useContext(TodoContext);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSort = (criteria) => {
        sortTodos(criteria);
        setIsDropdownOpen(false);
    };

    const sortTodos = (criteria) => {
        let sortedTodos;
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
                    sortedTodos = [...todoFiltre].sort((a, b) => a.categorie.localeCompare(b.categorie));
                    break;
                default:
                    sortedTodos = todoFiltre;
            }

            setFiltre(sortedTodos);
        }
        else {
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
                    sortedTodos = [...todos].sort((a, b) => a.categorie.localeCompare(b.categorie));
                    break;
                default:
                    sortedTodos = todos;
            }

            setTodos(sortedTodos);
        }
    };



    return (
        <div className="filter-container">
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
            <Recherche />
            <EnCoursEffectuer  />
        </div>
    );
};

export default Filter;