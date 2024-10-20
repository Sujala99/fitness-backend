import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Import UserProvider
import Register from './pages/Register';
import Login from './pages/Login';
import Workouts from './pages/Workouts';
import Logout from './pages/Logout'; // Import the Logout component
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/myworkouts"
            element={
              <ProtectedRoute>
                <Workouts />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<Logout />} /> {/* Logout Route */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;