import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginModal from '../pages/LoginModal';
import LogoSena from '../assets/logo512.png'; // Adjust the path as necessary

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white p-4 text-green-500 shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={LogoSena} alt="SENA" className="h-10 w-10 sm:h-12 sm:w-12" />
              <div className="text-xl sm:text-2xl font-semibold">SENA</div>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                className="p-2 text-green-500 hover:text-green-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <ul className={`hidden sm:flex sm:items-center sm:space-x-6 text-base font-semibold`}>
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "underline" : "hover:underline"}>Inicio</NavLink>
              </li>
              <li>
                <NavLink to="/sena-formacion-complementaria" className={({ isActive }) => isActive ? "underline" : "hover:underline"}>Formación Complementaria</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "underline" : "hover:underline"}>Dashboard</NavLink>
              </li>
              <li>
                <button
                  type="button"
                  className="py-2 px-4 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700"
                  onClick={() => setIsModalOpen(true)}
                >
                  Iniciar Sesión
                </button>
              </li>
            </ul>
          </div>
          {isMenuOpen && (
            <ul className="mt-4 flex flex-col space-y-4 text-base font-semibold sm:hidden">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "underline" : "hover:underline"} onClick={() => setIsMenuOpen(false)}>Inicio</NavLink>
              </li>
              <li>
                <NavLink to="/sena-formacion-complementaria" className={({ isActive }) => isActive ? "underline" : "hover:underline"} onClick={() => setIsMenuOpen(false)}>Formación Complementaria</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "underline" : "hover:underline"} onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
              </li>
              <li>
                <button
                  type="button"
                  className="py-2 px-4 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 w-full text-left"
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Iniciar Sesión
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;