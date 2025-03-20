import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

const EnCoursEffectuer = () => {
    const { todos, setFiltre, setFiltreActif } = useContext(TodoContext);

    const afficherEnCours = () => {
        const inProgressTasks = todos.filter((task) => !task.done);
        setFiltre(inProgressTasks);
        setFiltreActif(true);
    };


    const afficherTerminees = () => {
        const completedTasks = todos.filter((task) => task.done);
        setFiltre(completedTasks);
        setFiltreActif(true);
    };

    const afficherToutes = () => {
        setFiltre([]);
        setFiltreActif(false);
    };

    return (
        <div className="flex space-x-4">
            <button
                onClick={afficherEnCours}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Afficher les tâches en cours
            </button>

            <button
                onClick={afficherTerminees}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
                Afficher les tâches terminées
            </button>

            <button
                onClick={afficherToutes}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
                Afficher toutes les tâches
            </button>
        </div>
    );
};

export default EnCoursEffectuer;
