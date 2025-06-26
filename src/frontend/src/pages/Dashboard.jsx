import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaSearch, FaUserPlus, FaSignInAlt, FaClock, FaWrench, FaChartBar, FaQuestionCircle } from 'react-icons/fa';

const hexButtons = [
  { icon: <FaSearch size={30} />, label: 'Buscar\nCurso' },
  { icon: <FaUserPlus size={30} />, label: 'Registrar' },
  { icon: <FaSignInAlt size={30} />, label: 'Ingresar' },
  { icon: <FaClock size={30} />, label: 'Curso\nCorto' },
  { icon: <FaWrench size={30} />, label: 'Técnico' },
  { icon: <FaChartBar size={30} />, label: 'Tecnólogo' },
  { icon: <FaQuestionCircle size={30} />, label: 'Ayuda' },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 via-white to-green-200 bg-[url('/background.svg')] bg-no-repeat bg-cover">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 drop-shadow-md mb-10">BIENVENIDO AL SENA</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 justify-center">
          {hexButtons.map((btn, idx) => (
            <div
              key={idx}
              className="bg-white border border-green-400 rounded-xl px-4 py-6 text-center shadow hover:scale-102 transition-transform cursor-pointer"
            >
              <div className="text-green-600 mb-2">{btn.icon}</div>
              <div className="text-green-900 font-semibold whitespace-pre-line">{btn.label}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
