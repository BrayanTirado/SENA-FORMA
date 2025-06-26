import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import colombiaData from '../data/colombia.json';

// Opciones para otros dropdowns
const tipoDocumentoOptions = ['Cédula de Ciudadanía', 'Tarjeta de Identidad', 'Cédula de Extranjería'];
const generoOptions = ['Masculino', 'Femenino', 'Otro'];
const nivelAcademicoOptions = ['Primaria', 'Secundaria', 'Técnico', 'Tecnológico', 'Universitario', 'Posgrado'];
const discapacidadOptions = ['Sí', 'No'];
const grupoEtnicoOptions = ['Ninguno', 'Indígena', 'Afrodescendiente', 'Raizal', 'Palenquero', 'Gitano'];
const estratoOptions = ['1', '2', '3', '4', '5', '6'];

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


const Register = () => {
  const [dropdownOpen, setDropdownOpen] = useState({ field: null });
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', tipoDocumento: 'Cédula de Ciudadanía', numeroDocumento: '',
    fechaNacimiento: '', genero: '', telefono: '', direccion: '', departamento: '',
    ciudad: '', nivelAcademico: '', tituloProfesional: '', experiencia: '', certificaciones: '',
    eps: '', discapacidad: '', grupoEtnico: '', sisben: '', estrato: '', correo: '', contrasena: ''
  });
  const [municipios, setMunicipios] = useState([]);
    const departamentos = colombiaData.map((d) => d.departamento);

  const domNode = useClickOutside(() => setDropdownOpen({ field: null }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'departamento') {
    const departamentoSeleccionado = colombiaData.find((d) => d.departamento === value);
    setMunicipios(departamentoSeleccionado ? departamentoSeleccionado.ciudades : []);
    setFormData((prev) => ({ ...prev, ciudad: '' }));
    }

  };

  const handleDropdownSelect = (field, value) => {
  setFormData((prev) => ({ ...prev, [field]: value }));

  if (field === 'departamento') {
    const departamentoSeleccionado = colombiaData.find((d) => d.departamento === value);
    setMunicipios(departamentoSeleccionado ? departamentoSeleccionado.ciudades : []);
    setFormData((prev) => ({ ...prev, ciudad: '' }));
  }

  setDropdownOpen({ field: null });
};


    const tipoDocumentoRef = useRef();
    const generoRef = useRef();
    const departamentoRef = useRef();
    const ciudadRef = useRef();
    const nivelAcademicoRef = useRef();
    const discapacidadRef = useRef();
    const grupoEtnicoRef = useRef();
    const estratoRef = useRef();

    useClickOutside(tipoDocumentoRef, () => dropdownOpen.field === 'tipoDocumento' && setDropdownOpen({ field: null }));
    useClickOutside(generoRef, () => dropdownOpen.field === 'genero' && setDropdownOpen({ field: null }));
    useClickOutside(departamentoRef, () => dropdownOpen.field === 'departamento' && setDropdownOpen({ field: null }));
    useClickOutside(ciudadRef, () => dropdownOpen.field === 'ciudad' && setDropdownOpen({ field: null }));
    useClickOutside(nivelAcademicoRef, () => dropdownOpen.field === 'nivelAcademico' && setDropdownOpen({ field: null }));
    useClickOutside(discapacidadRef, () => dropdownOpen.field === 'discapacidad' && setDropdownOpen({ field: null }));
    useClickOutside(grupoEtnicoRef, () => dropdownOpen.field === 'grupoEtnico' && setDropdownOpen({ field: null }));
    useClickOutside(estratoRef, () => dropdownOpen.field === 'estrato' && setDropdownOpen({ field: null }));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow mx-auto w-full max-w-[1000px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">Registro</h2>
        <div className="bg-white p-12 sm:p-8 rounded-xl shadow-lg">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Columna 1 */}
            <div className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Juan"
                />
              </div>
              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido *</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Pérez"
                />
              </div>
              <div ref={tipoDocumentoRef} className="relative">

                <label htmlFor="tipoDocumento" className="block text-sm font-medium text-gray-700">Tipo de Documento *</label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen({ field: dropdownOpen.field === 'tipoDocumento' ? null : 'tipoDocumento' })}
                  className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                    </svg>
                    {formData.tipoDocumento}
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-all max-h-60 overflow-y-auto ${
                    dropdownOpen.field === 'tipoDocumento' ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                                    >
                  {tipoDocumentoOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="w-full px-4 py-2 text-base text-gray-900 hover:bg-gray-100 text-left"
                      onClick={() => handleDropdownSelect('tipoDocumento', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <label htmlFor="numeroDocumento" className="block text-sm font-medium text-gray-700">Número de Documento *</label>
                <div className="mt-1 flex items-center">
                  <svg className="absolute w-5 h-5 ml-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <input
                    type="text"
                    id="numeroDocumento"
                    name="numeroDocumento"
                    value={formData.numeroDocumento}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="1234567890"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento *</label>
                <div className="mt-1 flex items-center">
                    <svg className="absolute w-5 h-5 ml-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
                  </svg>
                    <input
                    type="date"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full pl-10 pr-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                </div>
              </div>
              <div ref={generoRef} className="relative">

                <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Género *</label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen({ field: dropdownOpen.field === 'genero' ? null : 'genero' })}
                  className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <text x="0" y="20" font-size="25">⚥</text>
                    </svg>
                    {formData.genero || 'Selecciona un género'}
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-all max-h-60 overflow-y-auto ${
                    dropdownOpen.field === 'genero' ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                >
                  {generoOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="w-full px-4 py-2 text-base text-gray-900 hover:bg-gray-100 text-left"
                      onClick={() => handleDropdownSelect('genero', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono *</label>
                <div className="mt-1 flex items-center">
                    <svg className="absolute w-5 h-5 ml-3 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="3101234567"
                    />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección *</label>
                <div className="mt-1 flex items-center">
                    <svg className="absolute w-5 h-5 ml-3 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="Calle 123 #45-67"
                    />
                </div>
              </div>

              <div ref={departamentoRef} className="relative">

                <label htmlFor="departamento" className="block text-sm font-medium text-gray-700">Departamento *</label>
                <button
                type="button"
                onClick={() => setDropdownOpen((prev) => ({ field: prev.field === 'departamento' ? null : 'departamento' }))} // Alterna con un toque
                className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {formData.departamento || 'Selecciona un departamento'}
                </div>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                </button>
                <div
                className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-all max-h-60 overflow-y-auto ${
                    dropdownOpen.field === 'departamento' ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                >
                {departamentos.map((dep) => (
                    <button
                    key={dep}
                    type="button"
                    className="w-full px-4 py-2 text-base text-gray-900 hover:bg-gray-100 text-left"
                    onClick={() => handleDropdownSelect('departamento', dep)} // Pasa el valor exacto
                    >
                    {dep}
                    </button>
                ))}
                </div>
              </div>
              <div ref={ciudadRef} className="relative">

                <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">Ciudad de Residencia *</label>
                <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => ({ field: prev.field === 'ciudad' ? null : 'ciudad' }))} // Un solo clic
                    className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-600"
                    disabled={!formData.departamento}
                >
                    <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {formData.ciudad || 'Selecciona una ciudad'}
                    </div>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div
                    className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-all max-h-60 overflow-y-auto ${
                    dropdownOpen.field === 'ciudad' ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                >
                    {municipios.map((mun) => (
                    <button
                        key={mun}
                        type="button"
                        className="w-full px-4 py-2 text-base text-gray-900 hover:bg-gray-100 text-left"
                        onClick={() => handleDropdownSelect('ciudad', mun)}
                    >
                        {mun}
                    </button>
                    ))}
                </div>
                </div>
              <div ref={nivelAcademicoRef} className="relative">

                <label htmlFor="nivelAcademico" className="block text-sm font-medium text-gray-700">Nivel Académico *</label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen({ field: dropdownOpen.field === 'nivelAcademico' ? null : 'nivelAcademico' })}
                  className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                    {formData.nivelAcademico || 'Selecciona un nivel'}
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-all max-h-40 overflow-y-auto ${
                    dropdownOpen.field === 'nivelAcademico' ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                >
                  {nivelAcademicoOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="w-full px-4 py-2 text-base text-gray-900 hover:bg-gray-100 text-left"
                      onClick={() => handleDropdownSelect('nivelAcademico', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna 2 */}
            <div className="space-y-6">
              <div>
                <label htmlFor="tituloProfesional" className="block text-sm font-medium text-gray-700">Título Profesional</label>
                <input
                  type="text"
                  id="tituloProfesional"
                  name="tituloProfesional"
                  value={formData.tituloProfesional}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Ingeniero Industrial"
                />
              </div>
              <div>
                <label htmlFor="experiencia" className="block text-sm font-medium text-gray-700">Experiencia en Años</label>
                <input
                  type="number"
                  id="experiencia"
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="5"
                />
              </div>
              <div>
                <label htmlFor="certificaciones" className="block text-sm font-medium text-gray-700">Certificaciones</label>
                <input
                  type="text"
                  id="certificaciones"
                  name="certificaciones"
                  value={formData.certificaciones}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Certificación en TI"
                />
              </div>
              <div>
                <label htmlFor="eps" className="block text-sm font-medium text-gray-700">EPS *</label>
                <input
                  type="text"
                  id="eps"
                  name="eps"
                  value={formData.eps}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Sura"
                />
              </div>
              <div ref={discapacidadRef} className="relative">

                <label htmlFor="discapacidad" className="block text-sm font-medium text-gray-700">Discapacidad *</label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen({ field: dropdownOpen.field === 'discapacidad' ? null : 'discapacidad' })}
                  className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z" />
                    </svg>
                    {formData.discapacidad || 'Selecciona una opción'}
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-all max-h-60 overflow-y-auto ${
                    dropdownOpen.field === 'discapacidad' ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                >
                  {discapacidadOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="w-full px-4 py-2 text-base text-gray-900 hover:bg-gray-100 text-left"
                      onClick={() => handleDropdownSelect('discapacidad', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div ref={grupoEtnicoRef} className="relative">

                <label htmlFor="grupoEtnico" className="block text-sm font-medium text-gray-700">Grupo Étnico *</label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen({ field: dropdownOpen.field === 'grupoEtnico' ? null : 'grupoEtnico' })}
                  className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z" />
                    </svg>
                    {formData.grupoEtnico || 'Selecciona un grupo'}
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-all max-h-60 overflow-y-auto ${
                    dropdownOpen.field === 'grupoEtnico' ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                >
                  {grupoEtnicoOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="w-full px-4 py-2 text-base text-gray-900 hover:bg-gray-100 text-left"
                      onClick={() => handleDropdownSelect('grupoEtnico', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="sisben" className="block text-sm font-medium text-gray-700">Sisben *</label>
                <input
                  type="text"
                  id="sisben"
                  name="sisben"
                  value={formData.sisben}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="123456"
                />
              </div>
              <div ref={estratoRef} className="relative">

                <label htmlFor="estrato" className="block text-sm font-medium text-gray-700">Estrato *</label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen({ field: dropdownOpen.field === 'estrato' ? null : 'estrato' })}
                  className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                    {formData.estrato || 'Selecciona un estrato'}
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-all max-h-60 overflow-y-auto ${
                    dropdownOpen.field === 'estrato' ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                >
                  {estratoOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="w-full px-4 py-2 text-base text-gray-900 hover:bg-gray-100 text-left"
                      onClick={() => handleDropdownSelect('estrato', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo *</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="juan.perez@example.com"
                />
              </div>
              <div className="relative">
                <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña *</label>
                <div className="mt-1 flex items-center">
                  <svg className="absolute w-5 h-5 ml-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="••••••••••"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                >
                  Registrarse
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;