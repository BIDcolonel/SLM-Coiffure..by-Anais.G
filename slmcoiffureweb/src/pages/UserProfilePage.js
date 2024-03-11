import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/css/UserProfile.css';

const apiUrl = process.env.REACT_APP_API_URL;

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Récupérer l'ID de l'utilisateur connecté depuis le token JWT stocké dans le navigateur
        const userId = await getUserIdFromToken();

        // Récupérer les données de l'utilisateur à partir de l'API
        const response = await axios.get(`${apiUrl}/api/users/read/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      }
    };

    fetchUserData();
  }, []);

  // Fonction pour extraire l'ID de l'utilisateur à partir du token JWT stocké dans le navigateur
  const getUserIdFromToken = async () => {
    try {
      // Faire une requête à votre backend pour récupérer les informations de l'utilisateur
      const response = await axios.get(`${apiUrl}/api/users/read`, {
        headers: {
          Authorization: localStorage.getItem('token'), // Supposant que vous stockez le token JWT dans le localStorage
        },
      });

      // Extraire l'ID de l'utilisateur des données de réponse
      return response.data.userId; // Assurez-vous que votre backend renvoie l'ID de l'utilisateur dans la réponse
    } catch (error) {
      console.error("Erreur lors de la récupération de l'ID de l'utilisateur à partir du token JWT :", error);
      // Gérer l'erreur en conséquence
    }
  };

  // Fonction pour mettre à jour les données utilisateur
  const handleUpdateUser = async () => {
    try {
      // Récupérer l'ID de l'utilisateur connecté depuis le token JWT stocké dans le navigateur
      const userId = await getUserIdFromToken();

      // Envoyer les données mises à jour à l'API pour la mise à jour
      await axios.put(`${apiUrl}/api/users/update/${userId}`, updatedUserData);

      // Mettre à jour les données utilisateur affichées sur la page
      setUserData({ ...userData, ...updatedUserData });

      // Désactiver le mode d'édition après la mise à jour
      setEditMode(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur :", error);
    }
  };

  return (
    <div className="user-profile-container">
      <h2>Profil Utilisateur</h2>
      {userData ? (
        <div>
          <p><strong>Nom:</strong> {editMode ? <input type="text" value={updatedUserData.lastName || userData.lastName} onChange={(e) => setUpdatedUserData({ ...updatedUserData, lastName: e.target.value })} /> : userData.lastName}</p>
          <p><strong>Prénom:</strong> {editMode ? <input type="text" value={updatedUserData.firstName || userData.firstName} onChange={(e) => setUpdatedUserData({ ...updatedUserData, firstName: e.target.value })} /> : userData.firstName}</p>
          <p><strong>Email:</strong> {editMode ? <input type="email" value={updatedUserData.email || userData.email} onChange={(e) => setUpdatedUserData({ ...updatedUserData, email: e.target.value })} /> : userData.email}</p>
          <p><strong>Téléphone:</strong> {editMode ? <input type="tel" value={updatedUserData.phone || userData.phone} onChange={(e) => setUpdatedUserData({ ...updatedUserData, phone: e.target.value })} /> : userData.phone}</p>
          {editMode ? (
            <button onClick={handleUpdateUser}>Enregistrer les modifications</button>
          ) : (
            <button onClick={() => setEditMode(true)}>Modifier</button>
          )}
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export default UserProfilePage;
