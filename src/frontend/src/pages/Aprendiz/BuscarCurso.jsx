import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaList,
  FaSearch,
  FaUniversity,
  FaClock,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaBook,
} from "react-icons/fa";

// Hook para cerrar el dropdown al hacer clic fuera
const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);
    return () => document.removeEventListener("mousedown", maybeHandler);
  });

  return domNode;
};

const DropdownItem = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-gray-700 hover:bg-green-100 hover:text-green-800 block px-5 py-2 text-base w-full text-left"
    >
      {label}
    </button>
  );
};

const cursosData = [
  {
    id: 1,
    tipo: "tecnico",
    nombre: "Técnico en Sistemas",
    modalidad: "Presencial",
    centro: "CFT Medellín",
    duracion: "2 años",
    descripcion:
      "Aprende a reparar, mantener y configurar sistemas informáticos.",
    requisitos: "Bachillerato completo.",
    habilidades: "Diagnóstico, instalación, soporte técnico.",
  },
  {
    id: 2,
    tipo: "tecnologo",
    nombre: "Tecnólogo en Desarrollo Web",
    modalidad: "Virtual",
    centro: "CFT Bogotá",
    duracion: "1.5 años",
    descripcion: "Desarrolla aplicaciones web modernas.",
    requisitos: "Técnico en sistemas o equivalente.",
    habilidades: "Frontend, Backend, Bases de Datos.",
  },
  {
    id: 3,
    tipo: "corto",
    nombre: "Curso Corto de Inglés Básico",
    modalidad: "Virtual",
    centro: "CFT Cali",
    duracion: "3 meses",
    descripcion: "Inglés básico conversacional y gramatical.",
    requisitos: "Mayor de 16 años.",
    habilidades: "Lectura, escritura, pronunciación.",
  },
  {
    id: 4,
    tipo: "tecnico",
    nombre: "Técnico en Electricidad",
    modalidad: "Presencial",
    centro: "CFT Barranquilla",
    duracion: "2 años",
    descripcion: "Instalaciones eléctricas industriales.",
    requisitos: "Bachillerato completo.",
    habilidades: "Cables, circuitos, normativas RETIE.",
  },
  {
    id: 5,
    tipo: "tecnologo",
    nombre: "Tecnólogo en Energías Renovables",
    modalidad: "Presencial",
    centro: "CFT Pereira",
    duracion: "2 años",
    descripcion: "Implementación de soluciones sostenibles.",
    requisitos: "Técnico en electricidad o afín.",
    habilidades: "Energía solar, eólica, eficiencia energética.",
  },
];

export default function BuscarCurso({ currentRole, onRoleChange }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const filtroInicial = params.get("tipo") || "todos";

  const [tipo, setTipo] = useState(filtroInicial);
  const [query, setQuery] = useState("");
  const [cursos, setCursos] = useState([]);
  const domNode = useClickOutside(() => setDropdownOpen(false));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    let filtrados = cursosData;
    if (tipo !== "todos") filtrados = filtrados.filter((c) => c.tipo === tipo);
    if (query)
      filtrados = filtrados.filter((c) =>
        c.nombre.toLowerCase().includes(query.toLowerCase())
      );
    setCursos(filtrados);
  }, [tipo, query]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navbar currentRole={currentRole} onRoleChange={onRoleChange} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 mb-8 text-center">
          Explora Nuestros Cursos
        </h1>

        {/* Filtros Decorados */}
        <div className="flex flex-col md:flex-row items-center mb-8 p-4 rounded-2xl">
          <div className="relative w-[300px] flex-shrink-0" ref={domNode}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full bg-green-600 flex items-center rounded-[5px] px-4 py-[10px] text-base font-medium text-white justify-between hover:bg-green-700 transition-all duration-300"
            >
              <span>Tipo: {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</span>
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4063 5.65625 17.6875 5.9375C17.9687 6.21875 17.9687 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1563 10.1875 14.25 10 14.25Z" />
              </svg>
            </button>

            <div
              className={`shadow-lg absolute left-0 z-40 w-full rounded-md bg-white py-[10px] border-1 border-gray-300 transition-all ${
                dropdownOpen
                  ? "top-full opacity-100 visible"
                  : "top-[100%] invisible opacity-0"
              }`}
            >
              <DropdownItem label="Todos" onClick={() => setTipo("todos")} />
              <DropdownItem
                label="Técnico"
                onClick={() => setTipo("tecnico")}
              />
              <DropdownItem
                label="Tecnólogo"
                onClick={() => setTipo("tecnologo")}
              />
              <DropdownItem label="Corto" onClick={() => setTipo("corto")} />
            </div>
          </div>
          <div className="relative mt-4 md:mt-0 md:ml-24 flex-1">
            <input
              type="text"
              placeholder="¿Qué deseas estudiar?"
              className="input w-full px-4 py-2 pr-12 bg-white border-2 border-green-300 rounded-full text-gray-800 font-medium placeholder-gray-500 focus:outline-none focus:border-green-500 shadow-sm hover:bg-gray-50 transition-all duration-300"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition-all duration-300"
              onClick={() => {
                // Aquí puedes poner lógica para buscar, o simplemente dejarlo decorativo
                console.log("Buscar:", query);
              }}
            >
              <FaSearch className="text-sm" />
            </button>
          </div>
        </div>

        {/* Lista de Cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              No se encontraron cursos.
            </div>
          ) : (
            cursos.map((curso) => (
              <div
                key={curso.id}
                className="bg-white border border-green-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-green-800 mb-3">
                    {curso.nombre}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                    <div className="flex items-center">
                      <FaUniversity className="mr-2 text-green-500" />
                      {curso.centro}
                    </div>
                    <div className="flex items-center">
                      <FaChalkboardTeacher className="mr-2 text-green-500" />
                      {curso.modalidad}
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-green-500" />
                      {curso.duracion}
                    </div>
                    <div className="flex items-center">
                      <FaBook className="mr-2 text-green-500" />
                      {curso.tipo.toUpperCase()}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Descripción:</strong> {curso.descripcion}
                    </p>
                    <p>
                      <strong>Requisitos:</strong> {curso.requisitos}
                    </p>
                    <p>
                      <strong>Habilidades:</strong> {curso.habilidades}
                    </p>
                  </div>
                  <button
                    className="mt-4 w-full btn btn-outline btn-success text-sm py-2 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300"
                    onClick={() => navigate(`/curso/${curso.id}`)}
                  >
                    Ver más detalles
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
