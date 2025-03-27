import {useState, useEffect, useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";
function Header() {
    const { todos } = useContext(TodoContext);
    const nbTache = todos.length;
    const [tacheEnCours, setTacheEnCours] = useState(0);
    const [tacheEffectuee, setTacheEffectuee] = useState(0);

    useEffect(() => {
        const getTacheEnCours = (todos) => {
            return todos.filter(t => t.done === false).length;
        };

        const getTacheEffectuee = (todos) => {
            return todos.filter(t => t.done === true).length;
        };

        setTacheEnCours(getTacheEnCours(todos));
        setTacheEffectuee(getTacheEffectuee(todos));
    }, [todos]);

    return (
        <header>
            <h1>ToDo amU</h1>
            <p>{nbTache} Tâches, dont {tacheEnCours} En cours et {tacheEffectuee} Effectuées</p>
        </header>
    );
}

export default Header;