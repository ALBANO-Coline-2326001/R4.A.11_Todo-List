import React, {useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";

const Recherche = () => {
    //Chargement des variables depuis le contexte ou initialisation des autres variables
    const { todos, setFiltre, setFiltreActif } = useContext(TodoContext);
    const [rechercheTerm, setRechercheTerm] = useState('');
    const sauvegarde = todos;

    //Fonction pour rechercher une tâche
    const handleRecherche = (e) => {
        const term = e.target.value.toLowerCase();
        setRechercheTerm(term);
        filtreTodos(term);
    };

    //Filtrage de la liste des tâches,
    const filtreTodos = (term) => {
        //Si la recherche comporte moins de 3 caractères, on affiche toutes les tâches
        if (term.length < 3 ) {
            setFiltre([]);
            setFiltreActif(false);
        } else {
            //Sinon on trie les tâches selon le terme de recherche
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

    //Affichage de la barre de recherche
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