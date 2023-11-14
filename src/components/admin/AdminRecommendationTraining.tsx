import React, { useState } from 'react';
import { trainRecommendationModel, clearAllRecommendations } from '../api/api';
import Swal from 'sweetalert2';

const AdminRecommendationTraining = () => {
    const [isLoading, setIsLoading] = useState(false);

    const confirmAndTrainModel = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Deseas iniciar el entrenamiento del modelo de recomendaciones?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, iniciar entrenamiento'
        });

        if (result.isConfirmed) {
            handleTrainModel();
        }
    };

    const handleTrainModel = async () => {
        setIsLoading(true);
        try {
            await trainRecommendationModel();
            Swal.fire('Éxito', 'El modelo de recomendaciones ha sido entrenado con éxito.', 'success');
        } catch (error) {
            console.error('Error al entrenar el modelo:', error);
            Swal.fire('Error', 'Hubo un problema al entrenar el modelo.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const confirmAndClearRecommendations = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Deseas eliminar todas las recomendaciones?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar recomendaciones'
        });

        if (result.isConfirmed) {
            handleClearRecommendations();
        }
    };

    const handleClearRecommendations = async () => {
        setIsLoading(true);
        try {
            await clearAllRecommendations();
            Swal.fire('Éxito', 'Todas las recomendaciones han sido borradas.', 'success');
        } catch (error) {
            console.error('Error al borrar recomendaciones:', error);
            Swal.fire('Error', 'Hubo un problema al borrar las recomendaciones.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-5">Entrenar Modelo de Recomendaciones</h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <button
                    onClick={confirmAndTrainModel}
                    disabled={isLoading}
                    className={`w-full text-white font-bold py-2 px-4 rounded ${isLoading ? 'bg-gray-300' : 'bg-gray-500 hover:bg-blue-700'} transition-colors`}
                >
                    {isLoading ? 'Entrenando...' : 'Iniciar Entrenamiento'}
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <button
                    onClick={confirmAndClearRecommendations}
                    disabled={isLoading}
                    className={`w-full text-white font-bold py-2 px-4 rounded ${isLoading ? 'bg-gray-300' : 'bg-red-500 hover:bg-red-700'} transition-colors`}
                >
                    {isLoading ? 'Eliminando...' : 'Eliminar Recomendaciones'}
                </button>
            </div>
        </div>
    );
};

export default AdminRecommendationTraining;
