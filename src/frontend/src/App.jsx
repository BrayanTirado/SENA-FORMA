import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
   import SenaFormacionComplementaria from './pages/SenaFormacionComplementaria';
   import Dashboard from './pages/Dashboard';
   import Login from './pages/Login';
   import Register from './pages/Register';

   function App() {
     return (
       <Router>
         <Routes>
           <Route path="/" element={<Dashboard />} />
           <Route path="/sena-formacion-complementaria" element={<SenaFormacionComplementaria />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
         </Routes>
       </Router>
     );
   }

   export default App;