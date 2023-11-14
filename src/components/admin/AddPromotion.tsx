import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { addPromotion, getProducts } from '../api/api'; // Asegúrate de que la ruta es correcta

interface Product {
    id_product: number;
    name: string;
}

interface PromotionData {
    description: string;
    price: string;
    id_producto: string;
    image?: File;
}

const AddPromotion = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const [promotion, setPromotion] = useState<PromotionData>({
        description: '',
        price: '',
        id_producto: '',
        // No necesitas inicializar 'image' aquí si es opcional
    });
    const [image, setImage] = useState<File | undefined>(undefined);

    React.useEffect(() => {
        // Obtener la lista de productos al montar el componente
        const fetchProducts = async () => {
            try {
                const productsList: Product[] = await getProducts();
                setProducts(productsList);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setPromotion({ ...promotion, [name]: value });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Actualizar para asignar undefined en lugar de null
        setImage(event.target.files?.[0]);
    };

    const handleSubmit = async () => {
        if (!promotion.description || !promotion.price || !promotion.id_producto) {
            Swal.fire('Por favor, completa todos los campos requeridos.');
            return;
        }

        // Asegúrate de convertir los valores numéricos a números
        const price = parseFloat(promotion.price);
        const id_producto = parseInt(promotion.id_producto);

        // Si 'image' es undefined, pasa 'null' en su lugar
        const imageFile = image ?? null;

        try {
            const response = await addPromotion(promotion.description, price, imageFile, id_producto);
            console.log('Respuesta del servidor:', response);
            // Restablecer el formulario a su estado inicial
            setPromotion({
                description: '',
                price: '',
                id_producto: '',
            });
            setImage(undefined);
            // Manejo de respuesta exitosa...
            Swal.fire('Promoción agregada con éxito');
        } catch (error) {
            // Manejo de errores...
        }
    };



    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold mb-6">Añadir Promoción</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Descripción:</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={promotion.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="Descripción de la promoción"
                    />
                </div>
                {/* Campo para seleccionar imagen */}
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Imagen:</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Precio:</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={promotion.price}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="Precio de la promoción"
                    />
                </div>
                <select
                    name="id_producto" // Esto debe coincidir con la clave del estado promotion
                    id="idProduct" // El id puede ser diferente y es utilizado generalmente por el label
                    value={promotion.id_producto}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                >
                    <option value="">Seleccione un producto</option>
                    {products.map(product => (
                        <option key={product.id_product} value={product.id_product}>
                            {product.name}
                        </option>
                    ))}
                </select>
                
                {/* Botón para enviar el formulario */}
                <button
                    onClick={handleSubmit}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:ring-offset-2"
                >
                    Crear Promoción
                </button>
            </div>
        </div>
    );
};

export default AddPromotion;
