import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [editedService, setEditedService] = useState({});
  const [newService, setNewService] = useState({ name: '', price: '', clientTypes: '', hairLength: '' });
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios.get(`${apiUrl}/api/prestations/read`)
      .then(response => {
        setServices(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des prestations:', error);
      });
  };

  const handleEdit = (serviceId) => {
    const serviceToEdit = services.find(service => service._id === serviceId);
    setEditedService(serviceToEdit);
    setEditingServiceId(serviceId);
  };

  const handleUpdate = () => {
    axios.put(`${apiUrl}/api/prestations/update/${editedService._id}`, editedService)
      .then(() => {
        setEditingServiceId(null);
        fetchServices();
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la prestation:', error);
      });
  };

  const handleDelete = (serviceId) => {
    axios.delete(`${apiUrl}/api/prestations/delete/${serviceId}`)
      .then(() => {
        fetchServices();
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la prestation:', error);
      });
  };

  const handleCreate = () => {
    setIsCreating(prevState => !prevState);
    if (!isCreating) {
      setNewService({ name: '', price: '', clientTypes: '', hairLength: '' });
    }
  };

  const handleSave = () => {
    axios.post(`${apiUrl}/api/prestations/create`, newService)
      .then(response => {
        setServices([...services, response.data.data]);
        setIsCreating(false);
      })
      .catch(error => {
        console.error('Erreur lors de la création de la prestation:', error);
      });
  };

  return (
    <div>
      <h2>Gestion des prestations</h2>
      <button onClick={handleCreate}>{isCreating ? 'Annuler' : 'Ajouter une nouvelle prestation'}</button>
      {isCreating && (
        <div>
          <h3>Ajouter une nouvelle prestation</h3>
          <input type="text" placeholder="Nom" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} />
          <input type="number" placeholder="Prix" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} />
          <select value={newService.clientTypes} onChange={(e) => setNewService({ ...newService, clientTypes: e.target.value })}>
            <option value="">Sélectionner le sexe</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Enfant">Enfant</option>
          </select>
          <select value={newService.hairLength} onChange={(e) => setNewService({ ...newService, hairLength: e.target.value })}>
            <option value="">Sélectionner la longueur des cheveux</option>
            <option value="Long">Long</option>
            <option value="Mi-long">Mi-long</option>
            <option value="Court">Court</option>
          </select>
          <button onClick={handleSave}>Ajouter</button>
        </div>
      )}
      <table className="service-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Sexe</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <React.Fragment key={service._id}>
              <tr>
                <td>{service.name}</td>
                <td>{service.price}</td>
                <td>{service.clientTypes}</td>
                <td>{service.hairLength}</td>
                <td>
                  <button onClick={() => handleEdit(service._id)}>Modifier</button>
                  <button onClick={() => handleDelete(service._id)}>Supprimer</button>
                </td>
              </tr>
              {editingServiceId === service._id && (
                <tr>
                  <td colSpan="5">
                    <div>
                      <h3>Modifier la prestation</h3>
                      <input type="text" value={editedService.name} onChange={(e) => setEditedService({ ...editedService, name: e.target.value })} />
                      <input type="number" value={editedService.price} onChange={(e) => setEditedService({ ...editedService, price: e.target.value })} />
                      <select value={editedService.clientTypes} onChange={(e) => setEditedService({ ...editedService, clientTypes: e.target.value })}>
                        <option value="">Sélectionner le sexe</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                        <option value="Enfant">Enfant</option>
                      </select>
                      <select value={editedService.hairLength} onChange={(e) => setEditedService({ ...editedService, hairLength: e.target.value })}>
                        <option value="">Sélectionner la longueur des cheveux</option>
                        <option value="Long">Long</option>
                        <option value="Mi-long">Mi-long</option>
                        <option value="Court">Court</option>
                      </select>
                      <button onClick={handleUpdate}>Enregistrer</button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceManagement;
