import TacheListe from "./TacheListe";
import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";

export const TodoWrapper = () => {
    const { todos, setTodos, todoFiltre, filtreActif, setFiltre } = useContext(TodoContext);

    const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));
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

    const editTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    }

    const editTask = (id, value, description, urgent, done, dateEcheance, contacts, categorie, task) => {
        task.id = id;
        task.value = value
        task.description = description
        task.urgent = urgent
        task.done = done
        task.dateEcheance = dateEcheance
        task.contacts = contacts
        task.categorie = categorie

        console.log(task)
        console.log(task.id)

        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, todo, isEditing: !todo.isEditing } : todo
            )
        );
    };


    return (
        <div className="TodoWrapper">
            <TacheListe tasks={filtreActif ? todoFiltre : todos} deleteTodo={deleteTodo} editTodo={editTodo} toggleComplete={toggleComplete} editTask={editTask}  />
        </div>
    );
};