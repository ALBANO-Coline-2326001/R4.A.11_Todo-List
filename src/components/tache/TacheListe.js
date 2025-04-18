import TacheItem from "./TacheItem";
import {EditTodoForm} from "../forms/EditTodoForm";

//Affichage de la liste des tâches
const TacheListe = ({tasks, deleteTodo, editTodo, toggleComplete, editTask} ) => {

    //On affiche soit la liste des taches fltrées soit la liste des taches globales
    return (
        <div className="task-list">
            <h2>Tâches en cours</h2>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map(task =>
                        task.isEditing ? (
                            <EditTodoForm key={task.id} editTask={editTask} task={task} />
                        ) : (
                            <TacheItem key={task.id} task={task} deleteTodo={deleteTodo} editTodo={editTodo} toggleComplete={toggleComplete} />
                        )
                    )}
                </ul>
            ) : (
                <p>Aucune tâche en cours.</p>
            )}
        </div>
    );
};
export default TacheListe;





