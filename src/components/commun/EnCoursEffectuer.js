import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

const EnCoursEffectuer = () => {
    const { todos, setFiltre, setFiltreActif } = useContext(TodoContext);
    const semaineDerniere = new Date();
    semaineDerniere.setDate(semaineDerniere.getDate() - 7);

    const tachesNonDate = todos.filter(task => new Date(task.date_echeance) >= semaineDerniere);

    const afficherEnCours = () => {
        const inProgressTasks = tachesNonDate.filter((task) => !task.done);
        setFiltre(inProgressTasks);
        setFiltreActif(true);
    };

    const afficherTerminees = () => {
        const completedTasks = tachesNonDate.filter((task) => task.done);
        setFiltre(completedTasks);
        setFiltreActif(true);
    };

    const afficherToutes = () => {
        setFiltre(todos);
        setFiltreActif(false);
    };

    return (
        <div className="flex space-x-4">
            <button onClick={afficherEnCours}>Afficher les tâches en cours (Tache daté de 1 semaine non affichée)</button>

            <button onClick={afficherTerminees}>Afficher les tâches terminées (Tache daté de 1 semaine non affichée)</button>

            <button onClick={afficherToutes}>Afficher toutes les tâches</button>
        </div>
    );
};

export default EnCoursEffectuer;