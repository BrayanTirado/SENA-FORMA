import React, { useState, useEffect, useRef } from "react";
import LogoSena from "../assets/logo512.png";

// Hook para cerrar el dropdown al hacer clic fuera
const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const maybeHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);
    return () => document.removeEventListener("mousedown", maybeHandler);
  }, [handler]);

  return domNode;
};

const LoginModal = ({ isOpen, onClose }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(
    "Cédula de Ciudadanía"
  );
  const domNode = useClickOutside(() => setDropdownOpen(false));

  if (!isOpen) return null;

  const handleSelect = (documentType) => {
    setSelectedDocument(documentType);
    setDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 sm:mx-auto relative z-10"
        style={{ boxShadow: "0 0 0 800px rgba(0, 0, 0, 0.2)" }}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl font-semibold"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="p-4 sm:p-6">
          <img
            src={LogoSena}
            alt="Logo SENA"
            className="w-auto h-8 sm:h-20 object-cover rounded-t-xl mb-4 mx-auto"
          />
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
            Iniciar Sesión
          </h3>
          <div className="mt-4 sm:mt-5">
            <form className="grid gap-y-4">
              <div ref={domNode} className="relative">
                <label
                  htmlFor="document-type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipo de Documento
                </label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="mt-1 w-full px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-900 border border-gray-200 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                      />
                    </svg>
                    {selectedDocument}
                  </div>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-all ${
                    dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  {[
                    "Cédula de Ciudadanía",
                    "Tarjeta de Identidad",
                    "Cédula de Extranjería",
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-900 hover:bg-gray-100 text-left"
                      onClick={() => handleSelect(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="document"
                  className="block text-sm font-medium text-gray-700"
                >
                  Número de Documento
                </label>
                <div className="mt-1 flex items-center">
                  <svg
                    className="absolute w-4 h-4 sm:w-5 sm:h-5 ml-3 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <input
                    type="text"
                    id="document"
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="1234567890"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      window.location.href = "/forgot-password";
                    }}
                    className="text-sm text-green-600 hover:underline font-medium"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="mt-1 flex items-center">
                  <svg
                    className="absolute w-4 h-4 sm:w-5 sm:h-5 ml-3 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  <input
                    type="password"
                    id="password"
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="••••••••••"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 text-sm sm:text-base"
              >
                Iniciar Sesión
              </button>
              <p className="mt-2 text-sm text-gray-600 text-center">
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  className="text-green-600 hover:underline font-medium"
                  onClick={() => {
                    onClose();
                    window.location.href = "/register";
                  }}
                >
                  Regístrate
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
