import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SenaFormacionComplementaria from './pages/SenaFormacionComplementaria';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import ForgottenPassword from './pages/ForgottenPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sena-formacion-complementaria" element={<SenaFormacionComplementaria />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgottenPassword />} />

      </Routes>
    </Router>
  );
}

export default App;