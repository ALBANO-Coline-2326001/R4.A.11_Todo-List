import TacheListe from "./TacheListe";
import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";


export const TodoWrapper = () => {
    //Chargement des variables depuis le contexte ou initialisation des autres variables
    const { todos, setTodos, todoFiltre, filtreActif, setFiltre } = useContext(TodoContext);

    //Supprimer une tâche en fonction de son id
    const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

    //Rendre une tache complete en fonction de son id
    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        );
        if (todoFiltre.length !== 0) {
            setFiltre(
                todos.map((todo) =>
                    todo.id === id ? {...todo, done: !todo.done} : todo
                )
            );
        }

    }

    //Modifier l'attribut edit d'une tache en fonction de son id, afin de savoir si elle est en train d'être éditée
    // afin d'afficher le formulaire d'édition ou non
    const editTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    }

    //Editer une tache en fonction de son id

    const editTask = (id, value, description, urgent, done, date_echeance, contacts, categorie, task) => {
        task.id = id;
        task.value = value
        task.description = description
        task.date_echeance = date_echeance
        task.done = done
        task.urgent = urgent

        task.contacts = contacts.split(' ').map(contact => ({ name: contact }));
        task.categorie = categorie

        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, todo, isEditing: !todo.isEditing } : todo
            )
        );
    };

    //Affichage de la liste des tâches
    return (
        <div className="TodoWrapper">
            <TacheListe tasks={filtreActif ? todoFiltre : todos} deleteTodo={deleteTodo} editTodo={editTodo} toggleComplete={toggleComplete} editTask={editTask}  />
        </div>
    );
};