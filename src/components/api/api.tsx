import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL + 'api/users';
const PRODUCT_API_BASE_URL = process.env.REACT_APP_BACKEND_URL + '/api/products'; // Asegúrate de que esta es la URL correcta de tu backend
const ORDER_API_BASE_URL = process.env.REACT_APP_BACKEND_URL + '/api/orders';
const RECOMMENDATION_API_BASE_URL = process.env.REACT_APP_BACKEND_URL + '/api/recommendations'; 
const PROMOTION_API_BASE_URL = process.env.REACT_APP_BACKEND_URL + '/api/promotions/add'; // Cambia esto si tu backend está en una URL diferente


export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (username: string, password: string, email: string, rol: string, idrol: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/`, {
      username,
      password,
      email,
      rol,
      idrol // Agregando idrol al body de la solicitud
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error detallado:", error.response ? error.response.data : error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
};


export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${PRODUCT_API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(`${PRODUCT_API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const addProduct = async (name: string, description: string, price: number, imageFile: File | null, category: string) => {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    if (imageFile) {
      formData.append('image', imageFile); // Asume que imageFile es un objeto File o Blob
    }
    formData.append('category', category);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post(PRODUCT_API_BASE_URL, formData, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error detallado:", error.response ? error.response.data : error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
};



export const updateProduct = async (
  id: number,
  name?: string,
  description?: string,
  price?: number,
  imageFile?: File | null,
  category?: string
) => {


  const formData = new FormData();

  if (name) formData.append('name', name);
  if (description) formData.append('description', description);
  if (price) formData.append('price', price.toString());
  if (imageFile) formData.append('image', imageFile); // Asume que imageFile es un objeto File o Blob
  if (category) formData.append('category', category);

  

  try {
    const response = await axios.put(`${PRODUCT_API_BASE_URL}/${id}`, formData);
    return response.data;
  } catch (error: any) {
    console.error("Error completo de Axios:", error.response ? error.response.data : error.message);
    handleError(error);
    throw error;
  }
};





export const deleteProduct = async (id: number) => {
  try {
    const response = await axios.delete(`${PRODUCT_API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error("Error detallado:", error.response ? error.response.data : error.message);
  } else {
    console.error("Error desconocido:", error);
  }
};

export const createOrder = async (userId: number, selectedItems: Array<any>) => {
  try {
    const response = await axios.post(`${ORDER_API_BASE_URL}`, {
      userId,
      selectedItems
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.log(error)
    throw error;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${ORDER_API_BASE_URL}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getOrderById = async (id: number) => {
  try {
    const response = await axios.get(`${ORDER_API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateOrder = async (id: number, status: string) => {
  try {
    const response = await axios.put(`${ORDER_API_BASE_URL}/${id}`, {
      status
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteOrder = async (id: number) => {
  try {
    const response = await axios.delete(`${ORDER_API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getOrdersByUserId = async (userId: number) => {
  try {
    const response = await axios.get(`${ORDER_API_BASE_URL}/user-orders?userId=${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// api.js
export const getProductName = async (idProduct: number) => {
  try {
    const response = await axios.get(`${PRODUCT_API_BASE_URL}/${idProduct}`);
    return response.data.name; // Suponiendo que la respuesta contiene el nombre del producto
  } catch (error) {
    console.error('Error al obtener el nombre del producto:', error);
    throw error;
  }
};

export const getRecommendationsByUserId = async (userId:number) => {
  try {
    const response = await axios.get(`${RECOMMENDATION_API_BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};


export const addPromotion = async (description: string, price: number, imageFile: File | null, id_producto: number) => {
  try {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('price', price.toString()); // Convertir el precio a string
    if (imageFile) {
      formData.append('image', imageFile); // Asume que imageFile es un objeto File o Blob
    }
    formData.append('id_producto', id_producto.toString()); // Convertir el id del producto a string

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post(PROMOTION_API_BASE_URL, formData, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error detallado:", error.response ? error.response.data : error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
  
};

export const trainRecommendationModel = async () => {
  try {
    // Suponiendo que no necesitas enviar un cuerpo con la solicitud
    const response = await axios.post(`${RECOMMENDATION_API_BASE_URL}/init`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const clearAllRecommendations = async () => {
  try {
    const response = await axios.post(`${RECOMMENDATION_API_BASE_URL}/clear`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};





