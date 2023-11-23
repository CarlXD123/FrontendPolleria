import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/outline';
import image1 from '../images/logoPolleria.png'
import { useDarkMode } from '../DarkMode';;



const SelectedComponentContext = createContext<["MAIN" | "PROFILE", React.Dispatch<React.SetStateAction<"MAIN" | "PROFILE">>]>(["MAIN", () => { }]);


const Dashboard: React.FC = () => {
  //const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();


  React.useEffect(() => {
    // Obtener la información del usuario del localStorage al cargar el componente
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}>
      <Navbar
        onDarkModeToggle={toggleDarkMode}
        darkMode={darkMode}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      />
      <div className="flex">
        <Sidebar darkMode={darkMode} currentUser={currentUser} />
        <Outlet /> {/* Este Outlet renderizará el contenido de las rutas anidadas, como Profile */}
      </div>
    </div>
  );
};

const Navbar: React.FC<{ onDarkModeToggle: () => void, darkMode: boolean, onMenuToggle: () => void }> = ({ onDarkModeToggle, darkMode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');  // Elimina el usuario del localStorage
    navigate('/login');  // Redirige al usuario a la página de inicio de sesión
  };

  const handleDahsboard= () => {
    navigate('/dashboard'); // Navega a '/dashboard'
  };


  
  return (
    <div className={`bg-brightRed p-4 text-white shadow-lg flex justify-between items-center`}>
      <div className="flex items-center">
        <img src={image1} alt="Polleria La Familia Logo" className="w-20 h-20 mr-4" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
          POLLERIA LA FAMILIA
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={onDarkModeToggle}
          className="flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg transition-transform transform duration-300 ease-in-out"
          title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}>
          <span className="text-xl">{darkMode ? '☀️' : '🌙'}</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg transition-transform transform duration-300 ease-in-out">
          <span className="mr-2">Cerrar Sesión</span>
          <i className="fas fa-sign-out-alt"></i> {/* Asumiendo que estás usando FontAwesome */}
        </button>
      </div>
    </div>
  );

};


const Sidebar: React.FC<{ darkMode: boolean, currentUser: any }> = ({ darkMode, currentUser }) => {
  const [, setSelectedComponent] = useContext(SelectedComponentContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const userRole = currentUser?.rol;  // Asumiendo que el rol del usuario se guarda bajo la propiedad 'rol'
  const [showTooltip, setShowTooltip] = useState(false); // <-- Nuevo estado para el tooltip
  const navigate = useNavigate(); // Aquí usamos el hook

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };


  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
      {/* Hamburguesa */}
      <div className="md:hidden p-4">
        <MenuIcon
          className="h-6 w-6 cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>

      {/* Sidebar */}
      <div className={`p-5 space-y-2 ${!showSidebar && 'hidden md:block'}`}>
        <ul className="list-none p-5">
          {userRole === 'Admin' && (
            <>
              <li className={`p-2 hover:bg-yellow-500 ${darkMode ? 'text-white' : 'text-black'} hover:text-white transition-colors duration-300 cursor-pointer w-full h-full`}>
                <Link to="/dashboard" className="block w-full h-full">
                  Inicio
                </Link>
              </li>
              <li className={`p-2 hover:bg-yellow-500 ${darkMode ? 'text-white' : 'text-black'} hover:text-white transition-colors duration-300 cursor-pointer`}>
                <Link to="/dashboard/profile" className="block w-full h-full">Perfil</Link>
              </li>
              <li className={`p-2 hover:bg-yellow-500 ${darkMode ? 'text-white' : 'text-black'} hover:text-white transition-colors duration-300 cursor-pointer`}>
                <Link to="/dashboard/addsuplier" className="block w-full h-full">Empleados</Link>
              </li>
              <li className={`p-2 hover:bg-yellow-500 ${darkMode ? 'text-white' : 'text-black'} hover:text-white transition-colors duration-300 cursor-pointer`}>
                <Link to="/dashboard/addproduct" className="block w-full h-full">Productos</Link>
              </li>
              <li className={`p-2 hover:bg-yellow-500 ${darkMode ? 'text-white' : 'text-black'} hover:text-white transition-colors duration-300 cursor-pointer`}>
                <Link to="/dashboard/train" className="block w-full h-full">Entrenamiento</Link>
              </li>
              <li className={`p-2 hover:bg-yellow-500 ${darkMode ? 'text-white' : 'text-black'} hover:text-white transition-colors duration-300 cursor-pointer`}>
                <Link to="/dashboard/sales" className="block w-full h-full">Ventas</Link>
              </li>
            </>
          )}

          {userRole === 'Cliente' && (
            <>
              <li className={`p-2 hover:bg-yellow-500 ${darkMode ? 'text-white' : 'text-black'} hover:text-white transition-colors duration-300 cursor-pointer`}>
                <Link to="/dashboard" className="block w-full h-full">Inicio</Link>
              </li>
              <li className={`p-2 hover:bg-yellow-500 ${darkMode ? 'text-white' : 'text-black'} hover:text-white transition-colors duration-300 cursor-pointer`}>
                <Link to="/dashboard/profile" className="block w-full h-full">Perfil</Link>
              </li>
              <li className={`p-2 hover:bg-yellow-500 ${darkMode ? 'text-white' : 'text-black'} hover:text-white transition-colors duration-300 cursor-pointer`}>
                <Link to="/dashboard/menu" className="block w-full h-full">Menu</Link>
              </li>
              <li className={`p-2 hover:bg-yellow-500 ${darkMode ? 'text-white' : 'text-black'} hover:text-white transition-colors duration-300 cursor-pointer`}>
                <Link to="/dashboard/orders" className="block w-full h-full">
                  Realizar Pedido
                </Link>
              </li>

            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
