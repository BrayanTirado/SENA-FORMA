import React, { useState } from 'react';
import { FaEnvelope, FaExclamationCircle, FaCheckCircle, FaArrowLeft, FaTimesCircle, FaHome } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Breadcrumb = ({ step }) => {
  const steps = ['Inicio', 'Recuperar contraseña', 'Validar código', 'Restablecer contraseña', 'Éxito'];

  return (
    <div className="pt-10">
      <div className="max-w-2xl mx-auto px-4 py-3 border border-gray-200 rounded-lg">
        <nav className="flex flex-wrap items-center text-sm text-gray-500 justify-center">
          {steps.map((label, index) => (
            <div key={index} className="flex items-center">
              {index !== 0 && <span className="mx-2 text-gray-400">/</span>}
              {index === 0 ? (
                <a href="/" className={`flex items-center ${index === step ? 'text-black font-semibold' : 'text-gray-500'} hover:text-green-600`}>
                  <FaHome className="mr-1" />
                  <span>Inicio</span>
                </a>
              ) : (
                <span className={`flex items-center ${index === step ? 'text-black font-semibold' : 'text-gray-500'}`}>{label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);

  const fakeDBEmail = 'usuario@example.com';
  const fakeCode = '123456';

  const handleSend = () => {
    if (email !== fakeDBEmail) {
      setEmailError(true);
    } else {
      setEmailError(false);
      setStep(2);
    }
  };

  const handleValidateCode = () => {
    if (inputCode !== fakeCode) {
      setCodeError(true);
    } else {
      setCodeError(false);
      setStep(3);
    }
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleResetPassword = () => {
    if (passwordsMatch) {
      setSubmitted(true);
    }
  };

  const validateRequirement = (regex) => regex.test(password);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Breadcrumb step={submitted ? 4 : step} />
      <div className="flex-grow flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        {!submitted ? (
          <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
            {step === 1 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Recuperar contraseña</h2>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Correo electrónico</label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
                    placeholder="ejemplo@correo.com"
                  />
                  {emailError && (
                    <FaExclamationCircle className="absolute right-3 top-3 text-red-500" />
                  )}
                </div>
                {emailError && <p className="text-red-500 text-sm mt-1">No hay ningún registro con este correo</p>}
                <button
                  onClick={handleSend}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                >
                  Enviar código
                </button>
                <button onClick={() => setStep(2)} className="text-xs text-gray-400 underline mt-2">[Pasar al código]</button>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Validar código</h2>
                <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-700">Código recibido</label>
                <div className="relative">
                  <input
                    id="code"
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className={`w-full px-4 py-2 border ${codeError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
                    placeholder="123456"
                  />
                  {codeError && (
                    <FaExclamationCircle className="absolute right-3 top-3 text-red-500" />
                  )}
                </div>
                {codeError && <p className="text-red-500 text-sm mt-1">El código ingresado es incorrecto</p>}
                <button
                  onClick={handleValidateCode}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                >
                  Validar código
                </button>
                <button onClick={() => setStep(3)} className="text-xs text-gray-400 underline mt-2">[Pasar a restablecer]</button>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Restablecer contraseña</h2>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Nueva contraseña</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onFocus={() => setShowRequirements(true)}
                  onBlur={() => setShowRequirements(false)}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
                {showRequirements && (
                  <ul className="mt-2 text-sm space-y-1">
                    <li className="flex items-center">
                      {validateRequirement(/(?=.*[a-z])/) ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-red-500 mr-2" />} Letra minúscula
                    </li>
                    <li className="flex items-center">
                      {validateRequirement(/(?=.*[A-Z])/) ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-red-500 mr-2" />} Letra mayúscula
                    </li>
                    <li className="flex items-center">
                      {validateRequirement(/(?=.*\d)/) ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-red-500 mr-2" />} Número
                    </li>
                    <li className="flex items-center">
                      {validateRequirement(/(?=.*[@$!%*?&])/)
                        ? <FaCheckCircle className="text-green-500 mr-2" />
                        : <FaTimesCircle className="text-red-500 mr-2" />} Caracter especial (@$!%*?&)
                    </li>
                    <li className="flex items-center">
                      {validateRequirement(/.{8,}/) ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-red-500 mr-2" />} Mínimo 8 caracteres
                    </li>
                  </ul>
                )}

                <label htmlFor="confirmPassword" className="block mt-4 mb-2 text-sm font-medium text-gray-700">Confirmar contraseña</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onFocus={() => setShowRequirements(false)}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-2 border ${confirmPassword ? (passwordsMatch ? 'border-green-500' : 'border-red-500') : 'border-gray-300'} rounded-md focus:outline-none`}
                  />
                  {confirmPassword && (
                    passwordsMatch ? (
                      <FaCheckCircle className="absolute right-3 top-3 text-green-500" />
                    ) : (
                      <FaExclamationCircle className="absolute right-3 top-3 text-red-500" />
                    )
                  )}
                </div>
                {!passwordsMatch && confirmPassword && <p className="text-red-500 text-sm mt-1">Las contraseñas no coinciden</p>}

                <button
                  onClick={handleResetPassword}
                  disabled={!passwordsMatch}
                  className={`mt-4 w-full ${passwordsMatch ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'} text-white py-2 rounded-md`}
                >
                  Restablecer contraseña
                </button>
                <button onClick={() => setSubmitted(true)} className="text-xs text-gray-400 underline mt-2">[Simular éxito]</button>
              </>
            )}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Contraseña restablecida con éxito</h2>
            <button className="flex items-center gap-2 text-green-800 underline hover:text-green-600 mt-4">
              <FaArrowLeft /> Volver al inicio
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
