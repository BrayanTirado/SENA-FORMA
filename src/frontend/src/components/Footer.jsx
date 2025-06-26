import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-white py-4 border-[1px] border-gray-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="mt-2 text-sm font-medium text-gray-700">
            © {new Date().getFullYear()} SENA. Todos los derechos reservados.
          </p>
          <div className="mt-4 flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-white font-medium">Términos</a>
            <a href="#" className="text-gray-700 hover:text-white font-medium">Privacidad</a>
            <a href="#" className="text-gray-700 hover:text-white font-medium">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;