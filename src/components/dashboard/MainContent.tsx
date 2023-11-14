import React, { useState, useEffect } from 'react';
import image1 from '../images/baner-1.jpg';
import Promotions from '../promotions/Promotions';

const MainContent = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="w-full md:w-3/4 p-4 md:p-8">
      <div className="mb-4">
        {currentUser && (
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Bienvenido/a, {currentUser.username}</h1>
        )}
        <p className="text-md md:text-lg font-medium mt-2">
          Cada día es una nueva oportunidad para descubrir y disfrutar. ¡Estamos encantados de tenerte aquí!
        </p>
      </div>
      <div className="image-container mt-8 mb-8">
        <img src={image1} alt="Pollo completo" className="w-4/5 md:w-full lg:w-full rounded-lg shadow-lg mx-auto" />
      </div>

       {currentUser && currentUser.rol === 'Cliente' && <Promotions />}
    </div>
  );
};

export default MainContent;
