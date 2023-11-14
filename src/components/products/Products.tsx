import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/api';
import { useDarkMode } from '../DarkMode';

interface ProductsItem {
  id_product: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // Nota: Aquí he cambiado "image" por "imageUrl"
}

const Products: React.FC = () => {
  const [foodItems, setFoodItems] = useState<ProductsItem[]>([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    // Llama a tu API para obtener los productos
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        // Asegúrate de que la estructura de los datos de la respuesta coincide con la estructura de ProductsItem
        setFoodItems(products.map((product: any) => ({
          id_product: product.id_product,
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: `${process.env.REACT_APP_BACKEND_URL}/uploads/${product.image}`, // Asumiendo que tus imágenes se sirven desde el backend. Cambia la URL si es diferente.
        })));
      } catch (error) {
        console.error("Hubo un error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={`min-h-screen py-8 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className={`text-4xl font-extrabold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Carta</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"> {/* Aumentado el gap para dar más espacio entre cards */}
          {foodItems.map((item) => (
            <div key={item.id_product} className={`bg-white p-5 rounded-lg shadow hover:shadow-md transition-all duration-300 ${darkMode ? 'bg-gray-700' : ''}`}>
              <img src={item.imageUrl} alt={item.name} className="w-4/5 h-40 object-cover rounded-t-lg mb-3 mx-auto" /> {/* Reducido el tamaño y centrado la imagen */}
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-500' : 'text-black'}`}>{item.name}</h3>
              <p className={`text-gray-500 mb-3 ${darkMode ? 'text-gray-300' : ''}`}>{item.description}</p>
              <div className="flex justify-between items-center">
                <span className={`text-red-600 text-lg font-semibold ${darkMode ? 'text-red-400' : ''}`}>S/. {item.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

};

export default Products;
