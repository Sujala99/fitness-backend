import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import UserContext

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({ name: '', duration: '' });
  const [error, setError] = useState('');
  const { user } = useContext(UserContext); // Get the user from UserContext

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/workouts/myworkouts', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setWorkouts(response.data.workouts);
      } catch (err) {
        console.error('Error fetching workouts', err);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  // Add workout
  const handleAddWorkout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/workouts/add', newWorkout, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setWorkouts([...workouts, response.data.workout]); // Update workout list
      setNewWorkout({ name: '', duration: '' }); // Reset form
    } catch (err) {
      setError('Failed to add workout');
    }
  };

  return (
    <div>
      <h2>My Workouts</h2>
      <form onSubmit={handleAddWorkout}>
        <div>
          <label>Workout Name</label>
          <input
            type="text"
            value={newWorkout.name}
            onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Duration (minutes)</label>
          <input
            type="number"
            value={newWorkout.duration}
            onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
            required
          />
        </div>
        <button type="submit">Add Workout</button>
      </form>
      {error && <p>{error}</p>}
      
      <div className="workout-list">
        {workouts.map((workout) => (
          <div key={workout._id} className="card">
            <h3>{workout.name}</h3>
            <p>Duration: {workout.duration} mins</p>
            <p>Status: {workout.status}</p>
            <p>Date Added: {new Date(workout.dateAdded).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <Link to="/logout">
        <button>Logout</button> {/* Logout Button */}
      </Link>
    </div>
  );
};

export default Workouts;
