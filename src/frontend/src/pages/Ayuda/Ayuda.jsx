// pages/Ayuda.jsx
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  FaQuestionCircle,
  FaUserGraduate,
  FaSignInAlt,
  FaTools,
  FaEllipsisH,
  FaExclamationCircle,
} from "react-icons/fa";
import senaLogo from "../../assets/logo512.png";

export default function Ayuda({ currentRole, onRoleChange }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Navbar currentRole={currentRole} onRoleChange={onRoleChange} />
      <main className="flex-grow flex justify-center items-center px-4 py-12">
        <div className="bg-white shadow-lg rounded-3xl p-8 md:p-12 max-w-4xl w-full border border-green-200 relative">
          <div className="flex justify-center mb-6">
            <img src={senaLogo} alt="SENA Logo" className="w-24 h-auto" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-700 mb-2">
            AYUDA Y SOPORTE
          </h1>
          <hr className="my-4 border-t border-gray-500" />
          <p className="text-center text-lg text-gray-700 mb-6">
            ¡Tienes dudas sobre...?
          </p>

          <ul className="space-y-4 text-lg text-green-900">
            <li className="flex items-center gap-3">
              <FaQuestionCircle className="text-2xl" />
              <span className="cursor-pointer hover:underline hover:text-green-600">
                Registro de cursos
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaUserGraduate className="text-2xl" />
              <span className="cursor-pointer hover:underline hover:text-green-600">
                Tipos de programa (Técnico/ Tecnólogo/ cursos cortos)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaSignInAlt className="text-2xl" />
              <span className="cursor-pointer hover:underline hover:text-green-600">
                Ingreso a la plataforma
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaTools className="text-2xl" />
              <span className="cursor-pointer hover:underline hover:text-green-600">
                Soporte técnico
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaEllipsisH className="text-2xl" />
              <span className="cursor-pointer hover:underline hover:text-green-600">
                Otro
              </span>
            </li>
          </ul>

          <div className="mt-10 flex justify-end">
            <button className="flex items-center gap-3 bg-green-100 border border-green-400 text-green-800 px-5 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-green-200 transition-all">
              Escribe aquí tu queja o reclamo{" "}
              <FaExclamationCircle className="text-xl" />
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
