import React, { useState, useEffect } from 'react';
import { addProduct, getProducts, updateProduct, deleteProduct, getProductById } from '../api/api';
import Swal from 'sweetalert2';

interface Product {
    id_product: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    key?: string; // Agregar una propiedad key opcional
}

const AddProduct: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductImage, setNewProductImage] = useState<File | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [imagePreview, setImagePreview] = useState(selectedProduct?.imageUrl || null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [formProductName, setFormProductName] = useState('');
    const [formProductPrice, setFormProductPrice] = useState('');
    const [formProductDescription, setFormProductDescription] = useState('');
    const [formProductCategory, setFormProductCategory] = useState('');
    const [formProductImage, setFormProductImage] = useState<File | null>(null);



    const [newProductCategory, setNewProductCategory] = useState('');


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error al obtener productos:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar productos',
                    text: 'No se pudieron cargar los productos desde el servidor.'
                });
            }
        };

        fetchProducts();
    }, []);

    const handleAddProduct = async () => {
        const newProduct = {
            name: newProductName,
            price: Number(newProductPrice),
            description: newProductDescription,
            image: newProductImage,
            category: newProductCategory
        };


        try {
            const addedProduct = await addProduct(
                newProduct.name,
                newProduct.description,
                newProduct.price,
                newProduct.image,
                newProduct.category
            );

            // No es necesario asignar una clave temporal aquí
            //setProducts([...products, addedProduct]);

            // Muestra la alerta con sweetalert2
            Swal.fire({
                icon: 'success',
                title: '¡Producto agregado!',
                text: 'El producto ha sido agregado exitosamente.'
            });

            // Limpia los campos del formulario
            setNewProductName('');
            setNewProductPrice('');
            setNewProductDescription('');
            setNewProductImage(null);
            setNewProductCategory('');

        } catch (error) {
            console.error("Error al añadir producto:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Complete los campos para agregar el producto.'
            });
        }
    };


    const handleUpdateProduct = async () => {
        if (selectedProduct) {
            try {
                const updatedProduct = await updateProduct(
                    selectedProduct.id_product,
                    formProductName,
                    formProductDescription,
                    Number(formProductPrice),
                    newProductImage,   // Pasando la imagen del producto como argumento
                    formProductCategory
                );

                setProducts(prevProducts =>
                    prevProducts.map(product =>
                        product.id_product === selectedProduct.id_product
                            ? { ...product, image: updatedProduct.image } // Actualiza la URL de la imagen
                            : product
                    )
                );



                // Cerrar modal y limpiar el estado
                setShowEditModal(false);
                setSelectedProduct(null);
                setImagePreview(null);           // Limpiar la vista previa de la imagen
                setFormProductImage(null);       // Limpiar la imagen del formulario

                // Limpiar los estados del formulario
                setFormProductName('');
                setFormProductPrice('');
                setFormProductDescription('');
                setFormProductCategory('');

                Swal.fire({
                    icon: 'success',
                    title: '¡Producto actualizado!',
                    text: 'El producto ha sido actualizado exitosamente.'
                });

            } catch (error) {
                console.error("Error al actualizar el producto:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al actualizar el producto.'
                });
            }
        }
    }






    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setFormProductName(product.name);
        setFormProductPrice(String(product.price));
        setFormProductDescription(product.description);
        setFormProductCategory(product.category);
        setImagePreview(product.imageUrl);  // asumimos que tu objeto Product tiene un campo imageUrl
        setShowEditModal(true);
    };




    const handleDeleteProduct = async (productId: number) => {
        // Primero muestra la alerta de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true, // Esto mostrará un botón de cancelar
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ¡eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            // Si el usuario confirma (presiona "Sí, ¡eliminar!")
            if (result.isConfirmed) {
                try {
                    await deleteProduct(productId);
                    setProducts(prevProducts => prevProducts.filter(product => product.id_product !== productId));

                    Swal.fire({
                        icon: 'success',
                        title: '¡Producto eliminado!',
                        text: 'El producto ha sido eliminado exitosamente.'
                    });
                } catch (error) {
                    console.error("Error al eliminar producto:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al eliminar el producto.'
                    });
                }
            }
        });
    };



    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
            setNewProductImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">Productos actuales</h1>
            <div className="bg-white rounded shadow p-4 mb-10 overflow-x-auto">
                {products.length ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Descripción
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Precio
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product.id_product}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-semibold text-lg text-gray-600">{product.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 whitespace-pre-wrap">
                                            {product.description}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-gray-600 text-lg">S/. {product.price}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button
                                            onClick={() => handleEditProduct(product)}
                                            className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded transition duration-150 ease-in-out mr-2"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id_product)}
                                            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-150 ease-in-out"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No hay productos disponibles en este momento.</p>
                )}
            </div>




            <h2 className="text-xl font-bold mb-4">Agregar nuevo producto</h2>
            <div className="bg-white p-6 rounded shadow">
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="product-name">Nombre del producto:</label>
                    <input
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        placeholder="Nombre del producto"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline text-gray-500"
                        id="product-name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="product-price">Precio:</label>
                    <input
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                        placeholder="Precio"
                        type="number"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline text-gray-500"
                        id="product-price"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="product-description">Descripción:</label>
                    <textarea
                        value={newProductDescription}
                        onChange={(e) => setNewProductDescription(e.target.value)}
                        placeholder="Descripción"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline text-gray-500"
                        id="product-description"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="product-image">Imagen del producto:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline text-gray-500"
                        id="product-image"
                    />
                    {imagePreview && <img src={imagePreview} alt="Vista previa" className="mt-4 w-64 h-64 object-cover" />}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="product-category">Categoría:</label>
                    <input
                        value={newProductCategory}
                        onChange={(e) => setNewProductCategory(e.target.value)}
                        placeholder="Categoría del producto"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline text-gray-500"
                        id="product-category"
                    />
                </div>
                <button
                    onClick={handleAddProduct}
                    className="bg-red-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Agregar producto
                </button>

                {showEditModal && selectedProduct && (
                    <div
                        className="fixed inset-0 bg-gray-700 bg-opacity-70 flex items-center justify-center z-50"
                        onClick={() => setShowEditModal(false)}
                    >
                        <div
                            className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/3"
                            onClick={e => e.stopPropagation()}
                        >

                            {/* Nombre del producto */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="edit-product-name">Nombre del producto:</label>
                                <input
                                    value={formProductName}
                                    onChange={(e) => setFormProductName(e.target.value)}
                                    placeholder="Nombre del producto"
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline text-gray-500"
                                    id="edit-product-name"
                                />
                            </div>

                            {/* Precio */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="edit-product-price">Precio:</label>
                                <input
                                    value={formProductPrice}
                                    onChange={(e) => setFormProductPrice(e.target.value)}
                                    placeholder="Precio"
                                    type="number"
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline text-gray-500"
                                    id="edit-product-price"
                                />
                            </div>

                            {/* Descripción */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="edit-product-description">Descripción:</label>
                                <textarea
                                    value={formProductDescription}
                                    onChange={(e) => setFormProductDescription(e.target.value)}
                                    placeholder="Descripción"
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline text-gray-500"
                                    id="edit-product-description"
                                ></textarea>
                            </div>

                            {/* Imagen del producto */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="edit-product-image">Imagen del producto:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline text-gray-500"
                                    id="edit-product-image"
                                />
                                {imagePreview && <img src={imagePreview} alt="Vista previa" className="mt-4 w-24 h-24 object-cover" />
                                }
                            </div>

                            {/* Categoría */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="edit-product-category">Categoría:</label>
                                <input
                                    value={formProductCategory}
                                    onChange={(e) => setFormProductCategory(e.target.value)}
                                    placeholder="Categoría del producto"
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline text-gray-500"
                                    id="edit-product-category"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={handleUpdateProduct}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                >
                                    Guardar cambios
                                </button>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>


    );
};

export default AddProduct;
