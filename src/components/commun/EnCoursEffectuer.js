import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

const EnCoursEffectuer = () => {
    //Chargement des variables depuis le contexte ou initialisation des autres variables
    const { todos, setFiltre, setFiltreActif } = useContext(TodoContext);
    const semaineDerniere = new Date();
    semaineDerniere.setDate(semaineDerniere.getDate() - 7);

    //Trie pour juste afficher les tâches non datées
    const tachesNonDate = todos.filter(task => new Date(task.date_echeance) >= semaineDerniere);

    //Fonctions pour afficher les tâches en cours
    const afficherEnCours = () => {
        const inProgressTasks = tachesNonDate.filter((task) => !task.done);
        setFiltre(inProgressTasks);
        setFiltreActif(true);
    };

    //Fonctions pour afficher les tâches terminées
    const afficherTerminees = () => {
        const completedTasks = tachesNonDate.filter((task) => task.done);
        setFiltre(completedTasks);
        setFiltreActif(true);
    };

    //Fonctions pour afficher toutes les tâches
    const afficherToutes = () => {
        setFiltre(todos);
        setFiltreActif(false);
    };

    //Affichage des boutons
    return (
        <div className="flex space-x-4">
            <button onClick={afficherEnCours}>Afficher les tâches en cours (Tache daté de 1 semaine non affichée)</button>

            <button onClick={afficherTerminees}>Afficher les tâches terminées (Tache daté de 1 semaine non affichée)</button>

            <button onClick={afficherToutes}>Afficher toutes les tâches</button>
        </div>
    );
};

export default EnCoursEffectuer;