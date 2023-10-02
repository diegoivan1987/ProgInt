import React from 'react';

function Habit({ habit, toggleHabit }) {
    return (
        <div className="habit">
            <span>{habit.name}</span>
            <span>Completado {habit.completedDates.length} veces</span>
            <input 
                type="checkbox" 
                checked={habit.completedDates.includes(new Date().toISOString().split('T')[0])}
                onChange={() => toggleHabit(habit.id)}
            />
        </div>
    );
}

export default Habit;
