import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/api';
import { createOrder } from '../api/api';
import Swal from 'sweetalert2';



interface ProductsItem {
    id_product: number;
    name: string;
    description: string;
    price: number;
    image: string;  // Utilizo "image" para la respuesta directa de la API
}

interface OrderItem extends ProductsItem {
    quantity: number;
}

const Orders: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
    const [foodItems, setFoodItems] = useState<ProductsItem[]>([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                // Asegúrate de que la estructura de los datos de la respuesta coincide con la estructura de ProductsItem
                setFoodItems(products.map((product: any) => ({
                    id_product: product.id_product,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: `${process.env.REACT_APP_BACKEND_URL}/uploads/${product.image}`,
                })));
            } catch (error) {
                console.error("Hubo un error al obtener los productos:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToOrder = (item: ProductsItem) => {
        setSelectedItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id_product === item.id_product);
            if (existingItem) {
                // Si el producto ya está en la lista, incrementa su cantidad
                const updatedItems = prevItems.map((i) =>
                    i.id_product === item.id_product ? { ...i, quantity: i.quantity + 1 } : i
                );
                Swal.fire({
                    title: 'Producto añadido',
                    text: `Has añadido más unidades de ${item.name} a tu pedido.`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                return updatedItems;
            } else {
                // Si el producto no está en la lista, agrégalo con cantidad 1
                Swal.fire({
                    title: 'Producto añadido',
                    text: `Has añadido ${item.name} a tu pedido.`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };





    const handlePlaceOrder = async () => {
        try {
            // Obtener el usuario desde localStorage
            const storedUser = localStorage.getItem("currentUser");
            if (!storedUser) {
                alert("Por favor, inicia sesión para realizar un pedido.");
                return;
            }

            const user = JSON.parse(storedUser);

            const userId = user.id_usuario;

            // Si por alguna razón no se pudo obtener el ID, muestra un error y regresa
            if (!userId) {
                alert("Error al obtener el ID del usuario. Por favor, intenta de nuevo.");
                return;
            }

            const orderItems = selectedItems.map(item => ({
                id: item.id_product,
                quantity: item.quantity,
                price: item.price
            }));

            const response = await createOrder(userId, orderItems);

            if (response && response.message) {
                Swal.fire({
                    title: 'Pedido realizado con éxito',
                    icon: 'success',
                    text: response.message,
                    confirmButtonText: 'Aceptar',
                }).then(() => {
                    setSelectedItems([]); // Limpia los elementos seleccionados después de realizar el pedido
                });
            } else {
                Swal.fire({
                    title: 'Error al realizar el pedido',
                    icon: 'error',
                    text: 'Hubo un problema al realizar el pedido. Por favor, intenta de nuevo.',
                    confirmButtonText: 'Aceptar',
                });
            }
        } catch (error) {
            console.error("Error al realizar el pedido:", error);
            Swal.fire({
                title: 'Error al realizar el pedido',
                icon: 'error',
                text: 'Hubo un problema al realizar el pedido. Por favor, intenta de nuevo.',
                confirmButtonText: 'Aceptar',
            });
        }
    };



    return (
        <div className="order-container p-5">
            <h2 className="text-3xl font-bold mb-5">Realizar Pedido</h2>

            <div className="menu-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                {foodItems.map((item) => (
                    <div key={item.id_product} className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200">
                        <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-3" />
                        <div>
                            <h3 className="text-gray-600 font-semibold mb-1">{item.name}</h3>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                            <p className="text-red-500 font-medium mt-2">S/. {item.price.toFixed(2)}</p>
                            <button
                                onClick={() => handleAddToOrder(item)}
                                className="mt-3 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 w-full"
                            >
                                Agregar al pedido
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            <div className="order-summary mb-5">
                <h3 className="text-2xl font-semibold mb-3">Resumen del Pedido</h3>
                <ul>
                    {selectedItems.map((item) => (
                        <li key={item.id_product} className="mb-2">
                            {item.name} x{item.quantity} - S/. {item.price * item.quantity}
                        </li>
                    ))}
                </ul>
                <button onClick={handlePlaceOrder} className="mt-4 bg-red-500 text-black px-10 py-2 rounded hover:bg-green-600">
                    Confirmar Pedido
                </button>
            </div>
        </div>
    );
};

export default Orders;
