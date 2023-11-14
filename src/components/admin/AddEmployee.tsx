import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { registerUser, getUsers } from '../api/api';

interface Employee {
    username: string;
    email: string;
    password: string;
}

const AddEmployee: React.FC = () => {
    const [employee, setEmployee] = useState<Employee>({
        username: '',
        email: '',
        password: '',
    });
    const [employeesList, setEmployeesList] = useState<Employee[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getUsers();
                setEmployeesList(users);
            } catch (error) {
                console.error("Error al obtener los administradores:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        console.log('Administrador añadido:', employee);
        try {
            const response = await registerUser(employee.username, employee.password, employee.email, 'Admin', 1);
            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Registrado exitosamente!',
                    text: 'Administrador añadido correctamente.'
                });
                setEmployee({
                    username: '',
                    email: '',
                    password: '',
                });
                // Refresca la lista de administradores después de añadir uno nuevo
                const updatedUsers = await getUsers();
                setEmployeesList(updatedUsers);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar',
                text: `Hubo un error al registrar al administrador: ${error}`
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold mb-6">Añadir Empleados</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">Nombre de Usuario:</label>
                    <input
                        name="username"
                        value={employee.username}
                        onChange={handleInputChange}
                        placeholder="Nombre de Usuario"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="username"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email:</label>
                    <input
                        name="email"
                        value={employee.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        type="email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Contraseña:</label>
                    <input
                        name="password"
                        value={employee.password}
                        onChange={handleInputChange}
                        placeholder="Contraseña"
                        type="password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="password"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Añadir Administrador
                </button>
            </div>

            {/* Lista de administradores */}
            <h2 className="text-2xl font-semibold mb-6">Lista de Empleados</h2>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                {employeesList.length === 0 ? (
                    <p className="text-gray-500">No hay administradores registrados aún.</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre de usuario
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {employeesList.map((e, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{e.username}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{e.email}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
};

export default AddEmployee;
