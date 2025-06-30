import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const modalidadOptions = ['Presencial', 'Virtual'];
const jornadaOptions = ['Mañana', 'Tarde', 'Noche'];

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const maybeHandler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener('mousedown', maybeHandler);
    return () => document.removeEventListener('mousedown', maybeHandler);
  }, [ref, handler]);
};

export default function CrearFicha() {
  const [ficha, setFicha] = useState({
    numero: '',
    programa: '',
    modalidad: '',
    jornada: '',
    fechaInicio: '',
    fechaFin: '',
  });

  const [dropdownOpen, setDropdownOpen] = useState({ field: null });
  const modalidadRef = useRef();
  const jornadaRef = useRef();

  useClickOutside(modalidadRef, () => setDropdownOpen((prev) => prev.field === 'modalidad' ? { field: null } : prev));
  useClickOutside(jornadaRef, () => setDropdownOpen((prev) => prev.field === 'jornada' ? { field: null } : prev));

  const handleChange = (e) => {
    setFicha({ ...ficha, [e.target.name]: e.target.value });
  };

  const handleDropdownSelect = (field, value) => {
    setFicha((prev) => ({ ...prev, [field]: value }));
    setDropdownOpen({ field: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Ficha creada:', ficha);
    // Aquí va la lógica para enviar la ficha al backend
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow mx-auto w-full max-w-[800px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">Crear Ficha</h2>
        <div className="bg-white p-10 sm:p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="numero" className="block text-sm font-medium text-gray-700">Número de Ficha *</label>
              <input
                type="text"
                id="numero"
                name="numero"
                value={ficha.numero}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="2548796"
              />
            </div>

            <div>
              <label htmlFor="programa" className="block text-sm font-medium text-gray-700">Programa de Formación *</label>
              <input
                type="text"
                id="programa"
                name="programa"
                value={ficha.programa}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Análisis y Desarrollo de Software"
              />
            </div>

            <div ref={modalidadRef} className="relative">
              <label className="block text-sm font-medium text-gray-700">Modalidad *</label>
              <button
                type="button"
                onClick={() => setDropdownOpen({ field: dropdownOpen.field === 'modalidad' ? null : 'modalidad' })}
                className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <span>{ficha.modalidad || 'Selecciona una modalidad'}</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-all max-h-60 overflow-y-auto ${dropdownOpen.field === 'modalidad' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                {modalidadOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="w-full px-4 py-2 text-base text-gray-900 hover:bg-gray-100 text-left"
                    onClick={() => handleDropdownSelect('modalidad', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div ref={jornadaRef} className="relative">
              <label className="block text-sm font-medium text-gray-700">Jornada *</label>
              <button
                type="button"
                onClick={() => setDropdownOpen({ field: dropdownOpen.field === 'jornada' ? null : 'jornada' })}
                className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <span>{ficha.jornada || 'Selecciona una jornada'}</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-all max-h-60 overflow-y-auto ${dropdownOpen.field === 'jornada' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                {jornadaOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="w-full px-4 py-2 text-base text-gray-900 hover:bg-gray-100 text-left"
                    onClick={() => handleDropdownSelect('jornada', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha de Inicio *</label>
              <input
                type="date"
                id="fechaInicio"
                name="fechaInicio"
                value={ficha.fechaInicio}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700">Fecha de Finalización *</label>
              <input
                type="date"
                id="fechaFin"
                name="fechaFin"
                value={ficha.fechaFin}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
              >
                Registrar Ficha
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
