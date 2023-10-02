import React, { useState, useEffect } from 'react';
import './App.css';
import HabitList from './components/HabitList';
import AddHabitForm from './components/AddHabitForm';

function App() {
    const [habits, setHabits] = useState(() => {
        const storedHabits = localStorage.getItem('habits');
        return storedHabits ? JSON.parse(storedHabits) : [];
    });

    // Guardar hábitos en localStorage cada vez que cambien
    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    const addHabit = (name) => {
        const newHabit = {
            id: Date.now(),
            name,
            completedDates: []
        };
        setHabits([...habits, newHabit]);
    }

    const toggleHabit = (id) => {
        const today = new Date().toISOString().split('T')[0];
        const updatedHabits = habits.map(habit => {
            if (habit.id === id) {
                if (habit.completedDates.includes(today)) {
                    return {
                        ...habit,
                        completedDates: habit.completedDates.filter(date => date !== today)
                    };
                } else {
                    return {
                        ...habit,
                        completedDates: [...habit.completedDates, today]
                    };
                }
            }
            return habit;
        });
        setHabits(updatedHabits);
    }

    return (
        <div className="app">
            <h1>Rastreador de Hábitos</h1>
            <AddHabitForm addHabit={addHabit} />
            <HabitList habits={habits} toggleHabit={toggleHabit} />
        </div>
    );
}

export default App;
