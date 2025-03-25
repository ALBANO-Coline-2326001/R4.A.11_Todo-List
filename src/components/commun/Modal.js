import React, {useContext, useState} from 'react';
import '../../assets/css/modal.css';
import  TodoForm  from "../forms/TodoForm";
import  CategoryForm  from "../forms/CategoryForm";
import {TodoContext} from "../contexts/TodoContext";

const Modal = ({ isOpen, onClose }) => {
    const [isTaskForm, setIsTaskForm] = useState(true);
    const { todos, categories, relations } = useContext(TodoContext);



    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">


                <h3>Add a Task and a Category</h3>
                <div>
                    <button onClick={() => setIsTaskForm(true)}>Add Task</button>
                    <button onClick={() => setIsTaskForm(false)}>Add Category</button>
                </div>

                {isTaskForm ? (
                    <TodoForm />
                ) : (
                    <CategoryForm />
                )}

                <button type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default Modal;