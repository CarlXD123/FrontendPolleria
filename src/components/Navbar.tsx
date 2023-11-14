import React, { useState, useEffect, useRef, RefObject, MouseEvent } from "react";
import { FaHome } from 'react-icons/fa';
import { FaProductHunt } from 'react-icons/fa';  // Ejemplo para Productos
import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';


import close_icon from '../assets/close_icon.svg';

function useOutsideAlerter(ref: RefObject<HTMLElement>, setOpenNav: (value: boolean) => void): void {
  useEffect(() => {

    function handleClickOutside(event: globalThis.MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenNav(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setOpenNav]);
}

interface NavbarProps {
  logo: string;
}

const Navbar: React.FC<NavbarProps> = ({ logo }) => {

  const [openNav, setOpenNav] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, setOpenNav);

  return (
    <div className="flex items-center justify-between h-20 px-8 bg-brightRed shadow-md text-white">
      <a href="/" className="pl-7 logo lg:ml-10">
        <img style={{ width: '100px', height: '79px' }} src={logo} alt="logo" />
      </a>

      {/* Mobile Nav */}
      <a onClick={() => setOpenNav(true)} className="sm:absolute sm:right-5 lg:hidden">
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.6" d="M0 2H20V4H0V2ZM0 7H20V9H0V7ZM0 12H20V14H0V12Z" fill="#737373" />
        </svg>
      </a>

      {openNav &&
        <div ref={wrapperRef} className="fixed top-0 left-0 z-50 w-full h-full bg-gray-900 flex justify-center items-center">
          <div className="bg-black w-4/5 md:w-2/5 lg:w-1/3 py-5 rounded-lg">
            <div onClick={() => setOpenNav(false)} className="absolute right-5 top-5"><img height="30" width="30" src={close_icon} alt="" /></div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <a onClick={() => setOpenNav(false)} href="/" className="text-lg font-semibold text-blue-800 transition-all hover:text-orange-500"><FaHome className="inline-block mr-2" style={{ color: 'white' }} /> Home</a>
              <a onClick={() => setOpenNav(false)} href="#contact" className="text-lg font-semibold text-blue-800 transition-all hover:text-orange-500"><FaProductHunt className="inline-block mr-2" style={{ color: 'white' }} /> Productos</a>
              <Link
                to="/login"
                onClick={() => setOpenNav(false)}
                className="text-lg font-semibold text-blue-800 transition-all hover:text-orange-500">
                Iniciar Sesion
              </Link>
            </div>
          </div>
        </div>
      }



      {/* Desktop Nav */}

      <div className="hidden lg:flex justify-around w-2/5 mr-12">
        <a onClick={() => setOpenNav(false)} href="/" className="text-lg font-semibold text-blue-800 transition-all hover:text-orange-500"><FaHome className="inline-block mr-2"/> Home</a>
        <a onClick={() => setOpenNav(false)} href="#contact" className="text-lg font-semibold text-blue-800 transition-all hover:text-orange-500"><FaProductHunt className="inline-block mr-2"/> Productos</a>
        <Link
          to="/login"
          onClick={() => setOpenNav(false)}
          className="text-lg font-semibold text-blue-800 transition-all hover:text-orange-500">
          Iniciar Sesion
        </Link>
      </div>

    </div>
  );
};

export default Navbar;
