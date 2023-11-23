import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Form from '../utilities/Forms';
import Swal from 'sweetalert2';
import { registerUser } from '../api/api';

interface ValidationState {
  validate?: {
    [key: string]: string[];
  };
}

const Register: React.FC = () => {
  const [username, setName] = useState<string>('');
  const [rol, setRol] = useState<string>('Cliente');
  const [idrol, setIdRol] = useState<number | null>(null);
  const [email, setEmail] = useState<string>('');
  const [direccion, setDireccion] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validate, setValidate] = useState<ValidationState>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const CLIENT_ROLE_ID = 2;

  const validateRegister = (): boolean => {
    let isValid = true;

    const validator = Form.validator({
      name: {
        value: username,
        isRequired: true,
      },
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
      direccion: {
        value: direccion,
        isRequired: true, // puedes añadir más validaciones si es necesario
      },
      telefono: {
        value: telefono,
        isRequired: true, // y aquí también
      },
      rol: {
        value: rol,
        isRequired: true,
      },
    });
    console.log("Validator Result:", validator);

    if (validator) {
      if (validator && validator.errors) {
        setValidate({
          validate: validator.errors,
        });
        isValid = false;
      }
    }

    return isValid;
  };


  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Log the data you're about to send
    console.log("Sending data:", { username, password, email, rol });

    const isValidate = validateRegister();

    // If validation fails, log the validation state and alert
    if (!isValidate) {
      console.warn("Validation failed:", validate);
      // Reemplazo de alert con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error de Validación',
        text: 'Por favor, relleno los campos!!!.'
      });
      return; // Return early to avoid making the API call
    }


    try {
      const response = await registerUser(username, password, email, rol, direccion, telefono, idrol ?? CLIENT_ROLE_ID);
      console.log(response);

      // Check if the affected rows are greater than 0
      if (response.affectedRows && response.affectedRows > 0) {
        Swal.fire({
          icon: 'success',
          title: '¡Registrado exitosamente!',
          text: 'Bienvenido!!'
        });

        setName('');
        setRol('Cliente');
        setEmail('');
        setDireccion('');
        setTelefono('');
        setPassword('');
        setValidate({});
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No completo los campos'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `There was an error registering the user: ${error}`
      });
    }
  };




  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-red-200 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-300">
        <p className="text-2xl text-center font-semibold mb-6 text-red-600">Crea tu cuenta</p>
        <form onSubmit={register} autoComplete="off" noValidate>
          {/* Name Input */}
          <div className="mb-5">
            <label htmlFor="username" className="block text-gray-600">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:border-red-500 transition ${validate.validate && validate.validate.name
                ? 'border-red-500'
                : 'border-gray-300'
                }`}
              placeholder="Ingresa tu nombre"
            />
            {validate.validate && validate.validate.name && (
              <p className="text-red-500 mt-2">{validate.validate.name[0]}</p>
            )}
          </div>
          {/* Campo de Dirección */}
          <div className="mb-5">
            <label htmlFor="direccion" className="block text-gray-600">Dirección</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md ${validate.validate && validate.validate.direccion
                ? 'border-red-500'
                : 'border-gray-300'
                }`}
              placeholder="Ingresa tu dirección"
            />
            {validate.validate && validate.validate.direccion && (
              <p className="text-red-500 mt-2">{validate.validate.direccion[0]}</p>
            )}
          </div>

          {/* Campo de Teléfono */}
          <div className="mb-5">
            <label htmlFor="telefono" className="block text-gray-600">Teléfono</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md ${validate.validate && validate.validate.telefono
                ? 'border-red-500'
                : 'border-gray-300'
                }`}
              placeholder="Ingresa tu teléfono"
            />
            {validate.validate && validate.validate.telefono && (
              <p className="text-red-500 mt-2">{validate.validate.telefono[0]}</p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-600">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md ${validate.validate && validate.validate.email
                ? 'border-red-500'
                : 'border-gray-300'
                }`}
              placeholder="Ingresa tu correo"
            />
            {validate.validate && validate.validate.email && (
              <p className="text-red-500 mt-2">{validate.validate.email[0]}</p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-600">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md ${validate.validate && validate.validate.password
                  ? 'border-red-500'
                  : 'border-gray-300'
                  }`}
                placeholder="Ingresa tu contraseña"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <i className="far fa-eye"></i>
                ) : (
                  <i className="far fa-eye-slash"></i>
                )}
              </button>
            </div>
            {validate.validate && validate.validate.password && (
              <p className="text-red-500 mt-2">{validate.validate.password[0]}</p>
            )}
          </div>
          {/* Sign Up Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:from-yellow-500 hover:to-red-600 transition transform duration-300 hover:scale-105"
            >
              Registrarse
            </button>
          </div>
        </form>
        <hr className="my-6 border-gray-300" />

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-gray-600">¿Ya tienes cuenta?</p>
          <Link to="/login" className="text-red-600 hover:underline">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
