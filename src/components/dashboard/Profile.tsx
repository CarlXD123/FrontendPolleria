import React, { useState, useEffect } from 'react';

interface UserProfile {
  username: string;
  email: string;
  bio: string;
  profileImage: string;
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Intenta obtener la información del usuario de localStorage
      const localData = localStorage.getItem('currentUser');

      if (localData) {
        setProfileData(JSON.parse(localData));
      } else {
        // Si no encuentra el usuario en localStorage, usa mockData
        const mockData: UserProfile = {
          username: 'Juan123',
          email: 'juan123@example.com',
          bio: 'Amante del café y los videojuegos.',
          profileImage: 'https://via.placeholder.com/150',
        };
        setProfileData(mockData);
      }
    };

    fetchData();
  }, []);

  if (!profileData) {
    return <div className="text-red-600 font-medium text-lg mt-5">Cargando...</div>;
  }
  const userInitial = profileData.username[0].toUpperCase();
  return (
    <div className="profile-container bg-yellow-100 p-10 rounded-lg shadow-2xl w-full max-w-md mx-auto mt-10 border-4 border-red-500">
      <div className="flex justify-center mb-5">
        <div className="profile-initial w-40 h-40 rounded-full border-8 border-red-500 flex items-center justify-center bg-gray-200 text-red-700 text-6xl">
          {userInitial}
        </div>
      </div>
      <h1 className="text-3xl font-extrabold text-center text-red-700 mb-5">{profileData.username}</h1>
      <div className="flex items-center mb-5 space-x-4">
        <label className="font-semibold text-gray-800 text-lg flex-shrink-0">Email:</label>
        <p className="text-red-600 font-medium flex-grow">{profileData.email}</p>
      </div>
    </div>
  );
};

export default Profile;
