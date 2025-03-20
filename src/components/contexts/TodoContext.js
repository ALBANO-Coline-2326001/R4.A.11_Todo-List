import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [todoFiltre, setFiltre] = useState([]);
    const [filtreActif, setFiltreActif] = useState(false);
    const [categories, setCategories] = useState([]);


    return (
        <TodoContext.Provider value={{ todos, setTodos, todoFiltre, setFiltre, filtreActif, setFiltreActif, categories, setCategories }}>
            {children}
        </TodoContext.Provider>
    );
};
