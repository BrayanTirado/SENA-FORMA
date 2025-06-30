import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Inicio";
import Register from "./pages/Register";
import ForgottenPassword from "./pages/ForgottenPassword";
import BuscarCurso from "./pages/Aprendiz/BuscarCurso";
import Ayuda from "./pages/Ayuda/Ayuda";
import CrearFicha from "./pages/Instructor/CrearFicha";
import HistorialFicha from "./pages/Instructor/HistorialFicha";

function App() {
  return (
    <Router>
      {/* ⬇️ Añade aquí el ToastContainer una sola vez */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/buscarcurso" element={<BuscarCurso />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgottenPassword />} />
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/crear-ficha" element={<CrearFicha />} />
        <Route path="/historial-ficha" element={<HistorialFicha />} />
      </Routes>
    </Router>
  );
}

export default App;
