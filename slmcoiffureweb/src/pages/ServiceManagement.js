import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [editedService, setEditedService] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(`${apiUrl}/api/prestations`)
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des prestations:', error);
      });
  }, []);

  const handleEdit = (service) => {
    setEditedService(service);
    setIsEditing(true);
  };

  const handleUpdate = () => {
    axios.put(`${apiUrl}/api/prestations/${editedService._id}`, editedService)
      .then(() => {
        setIsEditing(false);
        // Mettre à jour la liste des prestations après modification
        axios.get(`${apiUrl}/api/prestations`)
          .then(response => {
            setServices(response.data);
          });
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la prestation:', error);
      });
  };

  const handleDelete = (serviceId) => {
    axios.delete(`${apiUrl}/api/prestations/${serviceId}`)
      .then(() => {
        // Mettre à jour la liste des prestations après suppression
        setServices(services.filter(service => service._id !== serviceId));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la prestation:', error);
      });
  };

  return (
    <div>
      <h2>Gestion des prestations</h2>
      <ul>
        {services && services.map(service => (
          <li key={service._id}>
            <p>Nom: {service.name}</p>
            <p>Prix: {service.price}</p>
            <p>Sexe: {service.clientTypes}</p>
            <p>Type: {service.hairLength}</p>
            <button onClick={() => handleEdit(service)}>Modifier</button>
            <button onClick={() => handleDelete(service._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      {isEditing && (
        <div>
          <h3>Modifier la prestation</h3>
          <input type="text" value={editedService.name} onChange={(e) => setEditedService({ ...editedService, name: e.target.value })} />
          <input type="number" value={editedService.price} onChange={(e) => setEditedService({ ...editedService, price: e.target.value })} />
          <input type="text" value={editedService.clientTypes} onChange={(e) => setEditedService({ ...editedService, clientTypes: e.target.value })} />
          <input type="text" value={editedService.hairLength} onChange={(e) => setEditedService({ ...editedService, hairLength: e.target.value })} />
          <button onClick={handleUpdate}>Enregistrer</button>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
