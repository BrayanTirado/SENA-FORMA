import React from 'react';
import { NavLink } from 'react-router-dom';
import logoSena from '../assets/logo512.png'; 

const Navbar = () => {
  return (
    <nav className="bg-white p-4 text-green-500 shadow-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={logoSena} alt="SENA" className="size-12" />
        </div>
        <ul className="flex space-x-6 text-base font-semibold">
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
            <NavLink to="/login" className={({ isActive }) => isActive ? "underline" : "hover:underline"}>Iniciar Sesión</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;