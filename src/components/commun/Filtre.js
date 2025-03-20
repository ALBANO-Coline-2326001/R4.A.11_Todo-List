import React, {useContext, useState} from 'react';
import '../../assets/css/filter.css';
import Recherche from "./Recherche";
import EnCoursEffectuer from "./EnCoursEffectuer";
import {TodoContext} from "../contexts/TodoContext";


const Filter = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { todos, setTodos } = useContext(TodoContext);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSort = (criteria) => {
        sortTodos(criteria);
        setIsDropdownOpen(false);
    };

    const sortTodos = (criteria) => {
        let sortedTodos;
        switch (criteria) {
            case 'alphabetical':
                sortedTodos = [...todos].sort((a, b) => a.value.localeCompare(b.value));
                break;
            case 'creationDate':
                sortedTodos = [...todos].sort((a, b) => new Date(a.dateCreation) - new Date(b.dateCreation));
                break;
            case 'dueDate':
                sortedTodos = [...todos].sort((a, b) => new Date(a.dateEcheance) - new Date(b.dateEcheance));
                break;
            case 'category':
                sortedTodos = [...todos].sort((a, b) => a.categorie.localeCompare(b.categorie));
                break;
            default:
                sortedTodos = todos;
        }
        setTodos(sortedTodos);
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