import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../components/css/Prestations.css";

const apiUrl = process.env.REACT_APP_API_URL;

const Prestations = () => {
  const [prestations, setPrestations] = useState([]);

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

  return (
    <div className="prestations-container">
      <div>
        <h2>Pour Femme</h2>
        <h3>Cheveux Longs</h3>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
          {sortByAlphabeticalOrder(prestations.filter(prestation => prestation.clientTypes.includes('Femme') && prestation.hairLength === 'Long')).map(filteredPrestation => (
            <tr key={filteredPrestation._id}>
              <td>{filteredPrestation.name}</td>
              <td className="price">{filteredPrestation.price}</td> {/* Ajoutez la classe "price" ici */}
            </tr>
          ))}
          </tbody>
        </table>
        <h3>Cheveux Mi-longs</h3>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
          {sortByAlphabeticalOrder(prestations.filter(prestation => prestation.clientTypes.includes('Femme') && prestation.hairLength === 'Mi-long')).map(filteredPrestation => (
            <tr key={filteredPrestation._id}>
              <td>{filteredPrestation.name}</td>
              <td className="price">{filteredPrestation.price}</td> {/* Ajoutez la classe "price" ici */}
            </tr>
          ))}
          </tbody>
        </table>
        <h3>Cheveux Courts</h3>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
          {sortByAlphabeticalOrder(prestations.filter(prestation => prestation.clientTypes.includes('Femme') && prestation.hairLength === 'Court')).map(filteredPrestation => (
            <tr key={filteredPrestation._id}>
              <td>{filteredPrestation.name}</td>
              <td className="price">{filteredPrestation.price}</td> {/* Ajoutez la classe "price" ici */}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Pour Homme</h2>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
          {sortByAlphabeticalOrder(prestations.filter(prestation => prestation.clientTypes.includes('Homme'))).map(filteredPrestation => (
            <tr key={filteredPrestation._id}>
              <td>{filteredPrestation.name}</td>
              <td className="price">{filteredPrestation.price}</td> {/* Ajoutez la classe "price" ici */}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Pour Enfant</h2>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
          {sortByAlphabeticalOrder(prestations.filter(prestation => prestation.clientTypes.includes('Enfant'))).map(filteredPrestation => (
            <tr key={filteredPrestation._id}>
              <td>{filteredPrestation.name}</td>
              <td className="price">{filteredPrestation.price}</td> {/* Ajoutez la classe "price" ici */}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prestations;
