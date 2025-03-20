import React, {useState} from 'react'
import '../../assets/css/editTodoForm.css';

export const EditTodoForm = ({ editTask, task}) => {
    const [donnees, setDonnees] = useState({
        value: task.value,
        description: task.description,
        urgent: task.urgent,
        done: task.done,
        dateEcheance : task.dateEcheance,
        contacts: task.contacts,
        categorie: task.categorie
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDonnees({
            ...donnees,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (donnees.value) {
            editTask( task.id, donnees.value, donnees.description, donnees.urgent, donnees.done, donnees.dateEcheance, donnees.contacts, donnees.categorie, task);
            setDonnees({
                value: '',
                description: '',
                urgent: false,
                done: false,
                dateEcheance: '',
                contacts: ''
                //categorie: categories.length > 0 ? categories[0] : ''
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input type="text" name="value" value={donnees.value} onChange={handleChange} className="todo-input" placeholder="Ajouter une tache"/>
            <textarea name="description" value={donnees.description} onChange={handleChange} className="todo-input" placeholder="Ajouter une description"/>
            <textarea name="contacts" value={donnees.contacts} onChange={handleChange} className="todo-input" placeholder="Ajouter des contacts"/>
            <input type="date" name="dateEcheance" className="todo-input" value={donnees.dateEcheance} onChange={handleChange} />

            <label>Urgent:
                <input type="checkbox" name="urgent" checked={donnees.urgent} onChange={handleChange}/>
            </label>

            <label>Statut:
                <input type="checkbox" name="done" checked={donnees.done} onChange={handleChange}/>
            </label>

            {/*categories.length > 0 && (
                <label>
                    Catégorie:
                    <select name="categorie" value={donnees.categorie} onChange={handleChange}>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </label>
            )*/}
            <button type="submit" className="todo-btn">Editez</button>
        </form>
    );
};
/*
export const EditTodoForm = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task);

    const handleSubmit = (e) => {
        e.preventDefault();
        editTodo(value, task.id);
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Update task' />
            <button type="submit" className='todo-btn'>Editer Task</button>
        </form>
    )
}*/