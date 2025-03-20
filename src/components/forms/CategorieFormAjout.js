import React, { useState } from 'react';

const CategorieFormAjout = ({ onClose }) => {
    const [category, setCategory] = useState({
        intitule: '',
        description: '',
        couleur: '',
        pictogramme: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //onSubmit(category);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Nouvelle Catégorie</h3>
            <input type="text" name="intitule" placeholder="Intitulé" value={category.intitule} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={category.description} onChange={handleChange}></textarea>
            <input type="color" name="couleur" value={category.couleur} onChange={handleChange} required />
            <input type="text" name="pictogramme" placeholder="Pictogramme" value={category.pictogramme} onChange={handleChange} required />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default CategorieFormAjout;