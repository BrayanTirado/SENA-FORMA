import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginModal from '../pages/LoginModal';
import LogoSena from '../assets/logo512.png';

const Navbar = ({ currentRole, onRoleChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    onRoleChange(null);
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white p-4 text-green-500 shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={LogoSena} alt="SENA" className="h-10 w-10 sm:h-12 sm:w-12" />
              <div className="text-xl sm:text-2xl font-semibold">Formación Complementaria</div>
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
                <NavLink to="/" className={({ isActive }) => (isActive ? '' : 'hover:underline')}>Inicio</NavLink>
              </li>
              <li>
                <NavLink to="/ayuda" className={({ isActive }) => (isActive ? 'underline' : 'hover:underline')}>
                  Ayuda
                </NavLink>
              </li>
              {currentRole ? (
                <li ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 py-2 px-4 text-sm font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700"
                  >
                    <span className="capitalize">{currentRole}</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                      <button
                        type="button"
                        onClick={() => navigate('/perfil')}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Perfil
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </li>
              ) : (
                <li>
                  <button
                    type="button"
                    className="py-2 px-4 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Iniciar Sesión
                  </button>
                </li>
              )}
            </ul>
          </div>
          {isMenuOpen && (
            <ul className="mt-4 flex flex-col space-y-4 text-base font-semibold sm:hidden">
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? '' : 'hover:underline')} onClick={() => setIsMenuOpen(false)}>
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sena-formacion-complementaria"
                  className={({ isActive }) => (isActive ? 'underline' : 'hover:underline')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Formación Complementaria
                </NavLink>
              </li>
              {currentRole ? (
                <li ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full text-left py-2 px-4 text-sm font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700"
                  >
                    <span className="capitalize">{currentRole}</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                      <button
                        type="button"
                        onClick={() => {
                          navigate('/perfil');
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Perfil
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </li>
              ) : (
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
              )}
            </ul>
          )}
        </div>
      </nav>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;