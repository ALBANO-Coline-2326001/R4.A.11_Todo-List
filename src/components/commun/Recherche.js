import React, {useContext, useState} from 'react';
import '../../assets/css/recherche.css';
import {TodoContext} from "../contexts/TodoContext";

const Recherche = () => {
    const { todos, setFiltre, setFiltreActif } = useContext(TodoContext);

    const [rechercheTerm, setRechercheTerm] = useState('');
    const sauvegarde = todos;
    const handleRecherche = (e) => {
        const term = e.target.value.toLowerCase();
        setRechercheTerm(term);
        filtreTodos(term);
    };

    const filtreTodos = (term) => {
        if (term.length < 3 ) {
            setFiltre([]);
            setFiltreActif(false);
        } else {
            console.log('term', term.length);
            const filteredTodos = sauvegarde.filter(todo =>
                (todo.value && todo.value.toLowerCase().includes(term)) ||
                (todo.description && todo.description.toLowerCase().includes(term)) ||
                (todo.categorie && todo.categorie.toLowerCase().includes(term))
            );
            setFiltreActif(true);
            setFiltre(filteredTodos);
        }
    };

    return (
        <div className="recherche-container">
            <input
                type="text"
                placeholder="Rechercher..."
                value={rechercheTerm}
                onChange={handleRecherche}
                className="recherche-input"
            />
        </div>
    );
};

export default Recherche;