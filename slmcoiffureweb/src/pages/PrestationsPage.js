import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../components/css/Prestations.css";

const apiUrl = process.env.REACT_APP_API_URL;

const Prestations = () => {
  const [prestations, setPrestations] = useState([]);
  const [clientType, setClientType] = useState('Femme'); // Par défaut, afficher les prestations pour Femme
  const [hairLength, setHairLength] = useState('Long'); // Par défaut, afficher les prestations pour cheveux longs

  useEffect(() => {
    // Récupérer les prestations depuis l'API
    axios.get(`${apiUrl}/api/prestations/read`)
      .then(response => {
        setPrestations(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching prestations:', error);
      });
  }, []);

  // Fonction de tri par ordre alphabétique
  const sortByAlphabeticalOrder = (array) => {
    return array.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  };

  // Fonction pour changer le type de client et filtrer les prestations
  const handleClientTypeChange = (type) => {
    setClientType(type);
    // Réinitialiser la longueur des cheveux pour les femmes
    if (type === 'Femme') {
      setHairLength('Long');
    }
  };

  // Fonction pour changer la longueur des cheveux et filtrer les prestations
  const handleHairLengthChange = (length) => {
    setHairLength(length);
  };

  return (
    <div className="prestations-container">
      <div className="buttons-container">
        <button onClick={() => handleClientTypeChange('Femme')}>Femme</button>
        <button onClick={() => handleClientTypeChange('Homme')}>Homme</button>
        <button onClick={() => handleClientTypeChange('Enfant')}>Enfant</button>
      </div>
      {(clientType === 'Femme') && (
        <div className="tabs-container">
          <button onClick={() => handleHairLengthChange('Long')}>Cheveux Longs</button>
          <button onClick={() => handleHairLengthChange('Mi-long')}>Cheveux Mi-longs</button>
          <button onClick={() => handleHairLengthChange('Court')}>Cheveux Courts</button>
        </div>
      )}
      <div className="tables-container">
        <h2>Pour {clientType} - {hairLength}</h2>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
          {sortByAlphabeticalOrder(prestations.filter(prestation => prestation.clientTypes.includes(clientType) && (clientType !== 'Femme' || prestation.hairLength === hairLength))).map(filteredPrestation => (
            <tr key={filteredPrestation._id}>
              <td>{filteredPrestation.name}</td>
              <td className="price">{filteredPrestation.price}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prestations;
