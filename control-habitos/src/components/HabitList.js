import React from 'react';
import Habit from './Habit';

function HabitList({ habits, toggleHabit }) {
    return (
        <div className="habit-list">
            {habits.map(habit => (
                <Habit key={habit.id} habit={habit} toggleHabit={toggleHabit} />
            ))}
        </div>
    );
}

export default HabitList;
