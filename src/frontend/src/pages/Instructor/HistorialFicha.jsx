import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { toast } from 'react-toastify';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const INITIAL_FICHAS = [
  {
    numero: 101,
    programa: "Programación",
    modalidad: "Virtual",
    jornada: "Diurna",
    fechaInicio: "2025-06-01",
    fechaFinalizacion: "2025-12-01",
    estado: "pendiente",
  },
  {
    numero: 102,
    programa: "Diseño Gráfico",
    modalidad: "Presencial",
    jornada: "Nocturna",
    fechaInicio: "2025-06-02",
    fechaFinalizacion: "2025-11-30",
    estado: "aprobado",
  },
  {
    numero: 103,
    programa: "Marketing Digital",
    modalidad: "Virtual",
    jornada: "Diurna",
    fechaInicio: "2025-06-03",
    fechaFinalizacion: "2025-11-29",
    estado: "cancelado",
  },
  {
    numero: 104,
    programa: "Desarrollo Web",
    modalidad: "Presencial",
    jornada: "Nocturna",
    fechaInicio: "2025-06-04",
    fechaFinalizacion: "2025-12-02",
    estado: "pendiente",
  },
];

const STATE_CLASSES = {
  pendiente: "bg-yellow-100 text-yellow-800",
  aprobado: "bg-green-100 text-green-800",
  cancelado: "bg-red-100 text-red-800",
};

const STATE_ICONS = {
  pendiente: (
    <svg
      className="size-2.5"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  ),
  aprobado: (
    <svg
      className="size-2.5"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
    </svg>
  ),
  cancelado: (
    <svg
      className="size-2.5"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
    </svg>
  ),
};

const FichaTable = () => {
  const [fichas, setFichas] = useState(INITIAL_FICHAS);
  const [modalOpen, setModalOpen] = useState(false);
  const [fichaToDelete, setFichaToDelete] = useState(null);
  const [openExport, setOpenExport] = useState(false);

  const exportToExcel = () => {
    console.log("Exportar Excel general");
    const ws = XLSX.utils.json_to_sheet(filteredFichas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Fichas');
    XLSX.writeFile(wb, 'historial_fichas.xlsx');
    toast.success('Excel descargado correctamente');
  };

 const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Historial de Fichas', 14, 20);

    const tableData = filteredFichas.map(ficha => ([
        ficha.numero,
        ficha.programa,
        ficha.modalidad,
        ficha.jornada,
        ficha.fechaInicio,
        ficha.fechaFinalizacion,
        ficha.estado
    ]));

    autoTable(doc, {
        startY: 30,
        head: [['Número', 'Programa', 'Modalidad', 'Jornada', 'Fecha Inicio', 'Fecha Finalización', 'Estado']],
        body: tableData,
        styles: { fontSize: 10 },
    });

    doc.save('historial_fichas.pdf');
    toast.success('PDF exportado correctamente');
 };



  const exportFichaToExcel = (ficha) => {
    const singleFicha = [{
        Número: ficha.numero,
        Programa: ficha.programa,
        Modalidad: ficha.modalidad,
        Jornada: ficha.jornada,
        'Fecha Inicio': ficha.fechaInicio,
        'Fecha Finalización': ficha.fechaFinalizacion,
        Estado: ficha.estado,
    }];

    const ws = XLSX.utils.json_to_sheet(singleFicha);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Ficha');
    XLSX.writeFile(wb, `ficha_${ficha.numero}.xlsx`);
    toast.success(`Excel de la ficha ${ficha.numero} exportado correctamente`);
 };


  const exportFichaToPDF = (ficha) => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text(`Ficha #${ficha.numero}`, 14, 20);

    autoTable(doc, {
        startY: 30,
        head: [['Programa', 'Modalidad', 'Jornada', 'Fecha Inicio', 'Fecha Finalización', 'Estado']],
        body: [[
        ficha.programa,
        ficha.modalidad,
        ficha.jornada,
        ficha.fechaInicio,
        ficha.fechaFinalizacion,
        ficha.estado
        ]],
        styles: { fontSize: 10 },
    });

    doc.save(`ficha_${ficha.numero}.pdf`);
    toast.success(`PDF de ficha ${ficha.numero} exportado`);
  };



  const handleEdit = (numero) => {
    alert(`Editar ficha con número: ${numero}`);
    // Lógica para editar
  };

  const handleDelete = (numero) => {
    setFichaToDelete(numero);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    setFichas(fichas.filter((ficha) => ficha.numero !== fichaToDelete));
    setModalOpen(false);
    setFichaToDelete(null);
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setFichaToDelete(null);
  };

  const renderState = (estado) => (
    <span
      className={`py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full ${STATE_CLASSES[estado]}`}
    >
      {STATE_ICONS[estado]}
      {estado.charAt(0).toUpperCase() + estado.slice(1)}
    </span>
  );

  const [searchTerm, setSearchTerm] = useState("");

  const filteredFichas = fichas.filter(
    (ficha) =>
      ficha.programa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ficha.modalidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ficha.jornada.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ficha.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropUp, setDropUp] = useState(false);
  const dropdownRefs = useRef({});
  const exportMenuRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState(null);


  useEffect(() => {
    if (openDropdown !== null) {
      const button = document.querySelector(
        `[data-dropdown-btn="${openDropdown}"]`
      );
      const el = dropdownRefs.current[openDropdown];

      if (button && el) {
        const buttonRect = button.getBoundingClientRect();
        const dropdownHeight = el.offsetHeight || 160;
        const spaceBelow = window.innerHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;

        const fitsBelow = spaceBelow > dropdownHeight;

        const top = fitsBelow
          ? buttonRect.bottom + window.scrollY + 4
          : buttonRect.top + window.scrollY - dropdownHeight - 4;

        const left = buttonRect.right + window.scrollX - 160;

        setDropdownPosition({ top, left });
      }
    }
  }, [openDropdown]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const currentDropdown = dropdownRefs.current[openDropdown];
      const fichaButton = document.querySelector(
        `[data-dropdown-btn="${openDropdown}"]`
      );
      const exportMenu = exportMenuRef.current;
      const exportButton = event.target.closest("[data-export-button]");

      const clickedInsideExport = exportMenu?.contains(event.target);
      const clickedExportButton = event.target.closest("[data-export-button]");

      if (
        openDropdown !== null &&
        currentDropdown &&
        !currentDropdown.contains(event.target) &&
        fichaButton &&
        !fichaButton.contains(event.target)
      ) {
        setOpenDropdown(null);
      }

      if (openExport && exportMenu && !exportMenu.contains(event.target) && !exportButton) {
      setOpenExport(false);
     }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown, openExport]);

  const [downloadMessage, setDownloadMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const showDownloadModal = (message) => {
    setDownloadMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000); // Se oculta en 2 segundos
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Main Content */}
      <div className="flex-1 p-4 mt-8">
        <div className="max-w-[85rem] mx-auto">
          <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
            Historial de Fichas
         </h1>


          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-visible">
                  <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
                    <div className="sm:col-span-1">
                      <div className="relative">
                        <input
                          type="text"
                          id="search"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="py-2 px-3 ps-11 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 hover:bg-gray-50"
                          placeholder="Buscar"
                        />
                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                          <svg
                            className="size-4 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-2 md:grow">
                      <div className="flex justify-end gap-x-2">
                        <div className="relative">
                            <button
                                onClick={() => navigate("/crear-ficha")}
                                className="py-2 px-3 mr-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-2xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Crear ficha
                            </button>
                            <button
                                data-export-button
                                onClick={() => setOpenExport(!openExport)}
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                            >
                                <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                </svg>
                                Exportar
                            </button>

                            {openExport && (
                                <div
                                    id="export-menu"
                                    ref={exportMenuRef}
                                    className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-200 z-50 p-1"
                                >
                                    <button
                                    onClick={() => {
                                        exportToExcel();
                                        setOpenExport(false);
                                    }}
                                    className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100"
                                    >
                                    Excel
                                    </button>
                                    <button
                                    onClick={() => {
                                        exportToPDF();
                                        setOpenExport(false);
                                    }}
                                    className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100"
                                    >
                                    PDF
                                    </button>
                                </div>
                            )}

                        </div>

                      </div>
                    </div>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="ps-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Número
                          </span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Programa
                          </span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Modalidad
                          </span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Jornada
                          </span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Fecha Inicio
                          </span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Fecha Finalización
                          </span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Estado
                          </span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-end">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Acciones
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredFichas.map((ficha) => (
                        <tr key={ficha.numero}>
                          <td className="size-px whitespace-nowrap">
                            <div className="ps-6 py-2">
                              <span className="text-sm text-gray-600">
                                {ficha.numero}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-600">
                                {ficha.programa}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-600">
                                {ficha.modalidad}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-600">
                                {ficha.jornada}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-600">
                                {ficha.fechaInicio}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-600">
                                {ficha.fechaFinalizacion}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-2">
                              {renderState(ficha.estado)}
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap relative">
                            <div className="px-6 py-1.5 flex justify-end">
                              <div className="hs-dropdown [--placement:bottom-right] relative inline-block">
                                <button
                                  type="button"
                                  data-dropdown-btn={ficha.numero}
                                  onClick={() =>
                                    setOpenDropdown(
                                      openDropdown === ficha.numero
                                        ? null
                                        : ficha.numero
                                    )
                                  }
                                  className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                                  aria-haspopup="menu"
                                  aria-expanded="false"
                                >
                                  <svg
                                    className="size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                  </svg>
                                </button>
                                {openDropdown === ficha.numero && (
                                  <div
                                    ref={(el) =>
                                      (dropdownRefs.current[ficha.numero] = el)
                                    }
                                    className="fixed w-40 bg-white shadow-lg rounded-md border border-gray-200 z-[9999] text-sm"
                                    style={{
                                      top: dropdownPosition?.top,
                                      left: dropdownPosition?.left,
                                    }}
                                  >
                                    <div className="divide-y divide-gray-200">
                                      {/* Opciones */}
                                      <div className="py-1">
                                        <span className="block px-3 pb-1 text-xs font-medium uppercase text-gray-400">
                                          Opciones
                                        </span>
                                        <button
                                          className="block w-full text-left px-3 py-1.5 hover:bg-gray-100 text-gray-700"
                                          onClick={() =>
                                            handleEdit(ficha.numero)
                                          }
                                        >
                                          Editar
                                        </button>
                                        <button
                                          className="block w-full text-left px-3 py-1.5 hover:bg-red-100 text-red-600 font-medium"
                                          onClick={() =>
                                            handleDelete(ficha.numero)
                                          }
                                        >
                                          Eliminar
                                        </button>
                                      </div>

                                      {/* Descargar */}
                                      <div className="py-1">
                                        <span className="block px-3 pb-1 text-xs font-medium uppercase text-gray-400">
                                          Descargar
                                        </span>
                                        <button
                                          className="block w-full text-left px-3 py-1.5 hover:bg-gray-100 text-gray-700"
                                          onClick={() => exportFichaToExcel(ficha)}
                                        >
                                          Excel
                                        </button>
                                        <button
                                          className="block w-full text-left px-3 py-1.5 hover:bg-gray-100 text-gray-700"
                                          onClick={() => exportFichaToPDF(ficha)}
                                        >
                                          PDF
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {modalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50" >
                <div className="bg-white rounded-lg p-6" style={{ boxShadow: "0 0 0 800px rgba(0, 0, 0, 0.2)" }}>
                  <h3 className="text-lg font-semibold">
                    Confirmar eliminación
                  </h3>
                  <p className="mt-2">¿Estás seguro de eliminar la ficha?</p>
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      className="py-1 px-4 bg-gray-50 rounded-lg hover:bg-gray-200 border-[1px] border-gray-400"
                      onClick={cancelDelete}
                    >
                      Cancelar
                    </button>
                    <button
                      className="py-1 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={confirmDelete}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FichaTable;
