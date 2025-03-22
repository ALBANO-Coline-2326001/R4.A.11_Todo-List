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


    return (
        <div className="TodoWrapper">
            <TacheListe tasks={filtreActif ? todoFiltre : todos} deleteTodo={deleteTodo} editTodo={editTodo} toggleComplete={toggleComplete} editTask={editTask}  />
        </div>
    );
};