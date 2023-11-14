import React, { useState, useEffect } from 'react';
import { getRecommendationsByUserId } from '../api/api';
import { useDarkMode } from '../DarkMode';

interface Recommendation {
    type: string;
    id_product?: number;
    name?: string;
    price: string;
    imageUrl: string;
    id_promo?: number;
    description?: string;
    date_start?: string;
    date_finish?: string;
}

interface RecommendationCarouselProps {
    recommendations: Recommendation[];
    darkMode: boolean;
}

const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({ recommendations, darkMode }) => {
    return (
        <div className="flex overflow-x-auto py-2 space-x-2">
            {recommendations.map((rec) => (
                <div key={rec.id_product || rec.id_promo} className={`w-72 min-w-72 rounded-lg shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                    {rec.imageUrl && (
                        <img src={rec.imageUrl} alt={rec.name || rec.description} className="w-full h-40 object-cover rounded-t-lg" />
                    )}
                    <div className={`p-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        <h3 className="text-lg font-semibold mb-2">{rec.name || rec.description}</h3>
                        <p className="text-sm mb-2">{rec.type === 'product' ? `Producto` : `Promoción`}</p>
                        <span className={`font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>S/. {rec.price}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Promotions: React.FC = () => {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const { darkMode } = useDarkMode();

    const localData = localStorage.getItem('currentUser');
    const currentUser = localData ? JSON.parse(localData) : null;
    const userId = currentUser ? currentUser.id_usuario : null;

    console.log(recommendations)
    useEffect(() => {
        if (userId) {
            const loadRecommendations = async () => {
                try {
                    const data = await getRecommendationsByUserId(userId);
                    if (data && data.recommendations && Array.isArray(data.recommendations)) {
                        const recommendationsWithImageUrl = data.recommendations.map((rec: any) => ({
                            ...rec,
                            imageUrl: rec.image ? `http://localhost:4000/uploads/${rec.image}` : null
                        }));
                        setRecommendations(recommendationsWithImageUrl);
                    } else {
                        console.error('Data is not in the expected format:', data);
                    }
                } catch (error) {
                    console.error('Error fetching recommendations:', error);
                }
            };
            loadRecommendations();
        }
    }, [userId]);

    return (
        <div className={`container mx-auto px-4 py-10 sm:px-6 md:px-8 lg:px-10 xl:max-w-6xl 2xl:max-w-7xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h1 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recomendaciones</h1>
            {recommendations.length > 0 ? (
                <RecommendationCarousel recommendations={recommendations} darkMode={darkMode} />
            ) : (
                <p className={`text-center text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>No hay recomendaciones en este momento.</p>
            )}
        </div>
    );
};

export default Promotions;
