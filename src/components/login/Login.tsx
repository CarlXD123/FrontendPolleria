import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Form from '../utilities/Forms';
import { loginUser } from '../api/api';

interface ValidationState {
  validate?: {
    [key: string]: string[];
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [validate, setValidate] = useState<ValidationState>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateLogin = (): boolean => {
    let isValid = true;

    const validator = Form.validator({
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 6,
      },
    });

    if (validator.errors) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  const authenticate = async (e: FormEvent<HTMLFormElement>) => {
    console.log('Autenticando...');
    e.preventDefault();

    const isValid = validateLogin();
    console.log('¿Es válido el formulario?', isValid);

    if (isValid) {
      try {
        const responseData = await loginUser(email, password);
        console.log(responseData);
        if (responseData.token) {
          localStorage.setItem('authToken', responseData.token);
          // Guarda la información del usuario en el localStorage
          if (responseData.userData) {
            localStorage.setItem('currentUser', JSON.stringify(responseData.userData));
          }

          navigate('/dashboard');
        } else {
          Swal.fire({
            title: 'Error',
            text: responseData.message || 'Error al iniciar sesión',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          title: 'Error',
          text: 'Error al comunicarse con el servidor',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }

      navigate('/dashboard');
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, verifica que los datos ingresados son correctos.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };



  return (
    <div className="bg-yellow-100 min-h-screen flex justify-center items-center p-5">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-2xl border-2 border-yellow-300">
        <p className="text-2xl text-center font-semibold mb-8 text-red-600">Iniciar Sesión</p>
        <form onSubmit={authenticate} autoComplete="off">

          <div className="mb-6 relative">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              className={`w-full p-3 border rounded-lg ${validate.validate && validate.validate.email ? 'border-red-500 shake' : 'border-gray-300'} focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition duration-300`}
              id="email"
              name="email"
              value={email}
              placeholder="john.doe@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {validate.validate && validate.validate.email && (
              <div className="mt-1 pl-3">
                <div className="flex items-center">
                  <div className="h-4 w-1 bg-red-500 mr-2"></div>
                  <p className="text-orange-500 mt-2">{validate.validate.email[0]}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`w-full p-3 border rounded-lg pr-10 ${validate.validate && validate.validate.password ? 'border-red-500' : 'border-gray-300'} focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition duration-300`}
                name="password"
                id="password"
                value={password}
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(prev => !prev)}
              >
                <div className={`transform transition-transform duration-300 ${showPassword ? 'rotate-180' : ''}`}>
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM4.929 4.929A10.953 10.953 0 0110 4c2.547 0 4.89.99 6.637 2.648a1 1 0 11-1.474 1.352 8.937 8.937 0 00-5.163-1.969 8.94 8.94 0 00-5.165 1.97 1 1 0 01-1.473-1.352zM3.707 4.293a1 1 0 010 1.414L2.414 7.001l1.293 1.293a1 1 0 01-1.414 1.415l-2-2a1 1 0 010-1.414l2-2a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>

                  ) : (
                    <svg className="h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM4.929 4.929A10.953 10.953 0 0110 4c2.547 0 4.89.99 6.637 2.648a1 1 0 11-1.474 1.352 8.937 8.937 0 00-5.163-1.969 8.94 8.94 0 00-5.165 1.97 1 1 0 01-1.473-1.352zM3.707 4.293a1 1 0 010 1.414L2.414 7.001l1.293 1.293a1 1 0 01-1.414 1.415l-2-2a1 1 0 010-1.414l2-2a1 1 0 011.414 0z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M13.707 14.293a1 1 0 010 1.414l-1.293 1.293 1.293 1.293a1 1 0 01-1.414 1.415l-2-2a1 1 0 010-1.414l2-2a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>

                  )}
                </div>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {/* ... Resto de tu código ... */}
          </div>



          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 text-white font-semibold rounded-lg shadow-lg hover:from-yellow-500 hover:to-red-500 transition transform duration-300 hover:scale-105"
          >
            Log In
          </button>
          <div className="mt-6 text-center">
            <span className="text-gray-600">¿No tienes una cuenta?</span>
            <Link
              to="/register"
              className="ml-2 text-red-500 hover:underline"
            >
              Regístrate.
            </Link>
          </div>
          <div className="text-center">
            <Link to="/forgot" className="text-red-500 hover:underline text-sm">¿Olvidaste tu contraseña?</Link>
          </div>
          <div className="text-center mt-4">
            <Link to="/" className="text-gray-600 hover:underline text-sm">Volver al inicio</Link>
          </div>

        </form>
      </div>
    </div>

  );
};

export default Login;
