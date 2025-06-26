import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SenaFormacionComplementaria = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <h1 className="text-5xl font-semibold tracking-tight text-green-950 mb-8">
          Formación Complementaria - SENA
        </h1>
        <p className="mt-8 text-lg font-medium text-gray-700 mb-6">
          Bienvenido a la sección de Formación Complementaria del SENA. Aquí podrás encontrar
          información sobre los cursos disponibles, inscribirte y gestionar tu aprendizaje.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Cursos Disponibles</h2>
            <p className="text-base font-medium text-gray-600">
              Explora nuestra oferta de cursos complementarios para mejorar tus habilidades.
            </p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Ver Cursos
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Inscripciones</h2>
            <p className="text-base font-medium text-gray-600">
              Regístrate en los cursos que desees y comienza tu formación hoy mismo.
            </p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Inscribirme
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SenaFormacionComplementaria;