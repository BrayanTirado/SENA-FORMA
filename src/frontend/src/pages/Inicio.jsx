import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import {
  FaSearch, FaClock, FaWrench, FaChartBar, FaChalkboardTeacher, FaUserGraduate, FaUserShield, FaNewspaper, FaBullhorn, FaQuestionCircle,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const Inicio = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  const renderActions = () => {
    if (!role) return null;
    const common = [
      { icon: <FaSearch size={30} />, label: 'Buscar Curso', action: () => navigate('/BuscarCurso'), color: 'bg-blue-500' },
      { icon: <FaClock size={30} />, label: 'Curso Corto', action: () => navigate('/BuscarCurso?tipo=corto'), color: 'bg-yellow-500' },
      { icon: <FaWrench size={30} />, label: 'Técnico', action: () => navigate('/BuscarCurso?tipo=tecnico'), color: 'bg-green-500' },
      { icon: <FaChartBar size={30} />, label: 'Tecnólogo', action: () => navigate('/BuscarCurso?tipo=tecnologo'), color: 'bg-purple-500' },
      { icon: <FaQuestionCircle size={30} />, label: 'Ayuda', action: () => navigate('/Ayuda'), color: 'bg-gray-700' },
    ];

    let roleSpecific = [];
    if (role === 'instructor') {
      roleSpecific = [
        { icon: <FaChalkboardTeacher size={30} />, label: 'Crear Ficha', action: () => navigate('/crear-ficha'), color: 'bg-red-500' },
        { icon: <FaChalkboardTeacher size={30} />, label: 'Historial de Fichas', action: () => navigate('/historial-ficha'), color: 'bg-blue-500' },
      ];
    } else if (role === 'coordinador') {
      roleSpecific = [
        { icon: <FaUserShield size={30} />, label: 'Registrar Usuario', action: () => navigate('/coordinador/register-user'), color: 'bg-indigo-500' },
        { icon: <FaUserShield size={30} />, label: 'Gestionar Roles', action: () => navigate('/coordinador/manage-roles'), color: 'bg-pink-500' },
        { icon: <FaUserShield size={30} />, label: 'Aprobar Solicitudes', action: () => navigate('/coordinador/approve-solicitudes'), color: 'bg-cyan-500' },
      ];
    }

    return [...common, ...roleSpecific].map((act, idx) => (
      <motion.div
        key={idx}
        className={`rounded-xl border border-gray-200 shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300 ${act.color} text-white`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={act.action}
      >
        <div className="mb-3">{act.icon}</div>
        <span className="text-lg font-semibold text-center">{act.label}</span>
      </motion.div>
    ));
  };

  const news = [
    { id: 1, title: 'Nueva Convocatoria 2025', content: 'Se abren inscripciones para nuevos cursos técnicos...', date: '27/06/2025' },
    { id: 2, title: 'Actualización de Plataforma', content: 'Mejoras en el sistema de gestión de aprendizajes...', date: '26/06/2025' },
    { id: 3, title: 'Evento Nacional SENA', content: 'Celebración del día del aprendiz en Bogotá...', date: '25/06/2025' },
  ];

  const events = [
    { id: 1, title: 'Feria de Empleo', content: 'Encuentro con empresas el 30/06/2025...', date: '30/06/2025' },
    { id: 2, title: 'Taller de Innovación', content: 'Sesión gratuita el 01/07/2025...', date: '01/07/2025' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Navbar currentRole={role} onRoleChange={handleRoleChange} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-green-800 mb-6 animate-fade-in">
            Portal SENA
          </h1>
          <p className="text-xl text-gray-700 mb-6">Personaliza tu experiencia seleccionando tu rol</p>
          <div className="flex justify-center space-x-4 flex-wrap">
            {['aprendiz', 'instructor', 'coordinador'].map((r) => (
              <motion.button
                key={r}
                onClick={() => setRole(r)}
                className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                  role === r
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </motion.button>
            ))}
          </div>
        </section>

        {role && (
          <section className="mb-12">
            <h2 className="text-4xl font-semibold text-green-700 mb-8 text-center animate-slide-up">
              Acciones para {role.charAt(0).toUpperCase() + role.slice(1)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {renderActions()}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-4xl font-semibold text-green-700 mb-8 text-center animate-slide-up">
            Últimas Noticias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <FaNewspaper className="text-green-600 mr-2" size={24} />
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{item.content}</p>
                <div className="text-sm text-gray-500">Publicado: {item.date}</div>
                <button className="mt-4 text-green-600 font-medium hover:underline">
                  Leer más
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold text-green-700 mb-8 text-center animate-slide-up">
            Convocatorias y Eventos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <FaBullhorn className="text-green-600 mr-2" size={24} />
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{item.content}</p>
                <div className="text-sm text-gray-500">Fecha: {item.date}</div>
                <button className="mt-4 text-green-600 font-medium hover:underline">
                  Más información
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Inicio;