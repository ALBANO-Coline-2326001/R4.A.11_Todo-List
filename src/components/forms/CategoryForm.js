import React, { useState, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

const CategoryForm = () => {
    const { categories, setCategories } = useContext(TodoContext);
    const [donneCategory, setDonneCategory] = useState({
        id: 0,
        name: "",
        description: "",
        color: "red",
        icon: ""
    });

    const addCategory = () => {
        if (donneCategory.name.length >= 3 && !categories.some(cat => cat.name === donneCategory.name)) {
            setCategories([...categories, { ...donneCategory, id: categories.length + 1 }]);
            setDonneCategory({
                id: 0,
                name: "",
                description: "",
                color: "red",
                icon: ""
            });
        } else {
            if (categories.some(cat => cat.name === donneCategory.name))
                alert("A category with the same name already exists.");
            else
                alert("The category name must be at least 3 characters long.");
        }
    };

    return (
        <div>
            <input
                type="text"
                value={donneCategory.name}
                onChange={(e) => setDonneCategory({ ...donneCategory, name: e.target.value })}
                placeholder="Category name (min. 3 characters)"
            />
            <textarea
                value={donneCategory.description}
                onChange={(e) => setDonneCategory({ ...donneCategory, description: e.target.value })}
                placeholder="Description (optional)"
            />
            <select
                value={donneCategory.color}
                onChange={(e) => setDonneCategory({ ...donneCategory, color: e.target.value })}
            >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
                <option value="pink">Pink</option>
                <option value="black">Black</option>
                <option value="gray">Gray</option>
                <option value="brown">Brown</option>
            </select>
            <button onClick={addCategory}>Ajouter</button>
        </div>
    );
};

export default CategoryForm;