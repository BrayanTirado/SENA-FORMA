import React from 'react';
   import Navbar from '../components/Navbar';

   const Login = () => {
     return (
       <div className="min-h-screen bg-gray-900 py-24 sm:py-32">
         <Navbar />
         <div className="mx-auto max-w-md px-6 lg:px-8">
           <h2 className="text-5xl font-semibold tracking-tight text-white mb-8">Iniciar Sesión</h2>
           <form className="space-y-6">
             <div>
               <label htmlFor="email" className="text-base font-medium text-gray-300">Correo Electrónico</label>
               <input
                 id="email"
                 type="email"
                 className="mt-1 w-full px-4 py-2 text-base text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                 placeholder="tu@correo.com"
               />
             </div>
             <div>
               <label htmlFor="password" className="text-base font-medium text-gray-300">Contraseña</label>
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
               Iniciar Sesión
             </button>
           </form>
           <p className="mt-4 text-base font-medium text-gray-300 text-center">
             ¿No tienes cuenta? <a href="/register" className="text-green-400 hover:underline">Regístrate</a>
           </p>
         </div>
       </div>
     );
   };

   export default Login;