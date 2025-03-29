import {  useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

function Header() {
    // Chargement des variables depuis le contexte ou initialisation des autres variables
    const { todos } = useContext(TodoContext);
    const nbTache = todos.length;

    //Calcul du nombre de tâches en cours
    const getTacheEnCours = (todos) => {
        return todos.filter(t => t.done === false).length;
    };

    //Calcul du nombre de tâches effectuées
    const getTacheEffectuee = (todos) => {
        return todos.filter(t => t.done === true).length;
    };

    //Mise a jour du nombre de tache en cours et effectuée
    const tacheEnCours = getTacheEnCours(todos);
    const tacheEffectuee = getTacheEffectuee(todos);

    //Affichage du header
    return (
        <header>
            <h1>ToDo amU</h1>
            <p>{nbTache} Tâches, dont {tacheEnCours} En cours et {tacheEffectuee} Effectuées</p>
        </header>
    );
}

export default Header;