import axios from 'axios';

const sendProtectedRequest = async (apiUrl, endpoint) => {
  try {
    // Récupère le jeton du localStorage
    const token = localStorage.getItem('token');

    // Ajouter le jeton dans les en-têtes de la requête
    const headers = {
      Authorization: `Bearer ${token}`
    };

    // Envoie la requête API avec le jeton dans les en-têtes
    const response = await axios.get(`${apiUrl}/${endpoint}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la requête protégée:', error);
    throw error; // Renvoyer l'erreur pour la gérer dans le composant appelant
  }
};

export default sendProtectedRequest;
