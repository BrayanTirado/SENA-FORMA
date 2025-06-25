import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-24 sm:py-32">
      <Navbar />
      <div className="mx-auto max-w-md px-6 lg:px-8">
        <h2 className="text-5xl font-semibold tracking-tight text-white mb-8">
          Crear Cuenta
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="text-base font-medium text-gray-300"
            >
              Nombre
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 w-full px-4 py-2 text-base text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-base font-medium text-gray-300"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full px-4 py-2 text-base text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="tu@correo.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-base font-medium text-gray-300"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 w-full px-4 py-2 text-base text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-base font-medium text-gray-300 text-center">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-green-400 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
