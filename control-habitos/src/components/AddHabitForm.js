import React, { useState } from 'react';

function AddHabitForm({ addHabit }) {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addHabit(name);
        setName('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Nuevo hábito"
            />
            <button type="submit">Añadir</button>
        </form>
    );
}

export default AddHabitForm;
