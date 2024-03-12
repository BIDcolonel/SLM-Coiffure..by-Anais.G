import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [editedClient, setEditedClient] = useState({});
  const [newClient, setNewClient] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    gender: '',
    age: '',
    role: 'client'
  });
  const [editingClientId, setEditingClientId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios.get(`${apiUrl}/api/users/read`)
      .then(response => {
        setClients(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des clients:', error);
      });
  };

  const handleEdit = (clientId) => {
    const clientToEdit = clients.find(client => client._id === clientId);
    setEditedClient(clientToEdit);
    setEditingClientId(clientId);
  };

  const handleUpdate = () => {
    axios.put(`${apiUrl}/api/users/update/${editedClient._id}`, editedClient)
      .then(() => {
        setEditingClientId(null);
        fetchClients();
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du client:', error);
      });
  };

  const handleDelete = (clientId) => {
    axios.delete(`${apiUrl}/api/users/delete/${clientId}`)
      .then(() => {
        fetchClients();
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du client:', error);
      });
  };

  const handleCreate = () => {
    setIsCreating(prevState => !prevState);
    if (!isCreating) {
      setNewClient({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        gender: '',
        age: '',
        role: 'client'
      });
    }
  };

  const handleSave = () => {
    axios.post(`${apiUrl}/api/users/create`, newClient)
      .then(response => {
        setClients([...clients, response.data.data]);
        setIsCreating(false);
      })
      .catch(error => {
        console.error('Erreur lors de la création du client:', error);
      });
  };

  return (
    <div>
      <h2>Gestion des clients</h2>
      <button onClick={handleCreate}>{isCreating ? 'Annuler' : 'Ajouter un nouveau client'}</button>
      {isCreating && (
        <div>
          <h3>Ajouter un nouveau client</h3>
          <input type="email" placeholder="Email" value={newClient.email} onChange={(e) => setNewClient({ ...newClient, email: e.target.value })} />
          <input type="password" placeholder="Mot de passe" value={newClient.password} onChange={(e) => setNewClient({ ...newClient, password: e.target.value })} />
          <input type="text" placeholder="Prénom" value={newClient.firstName} onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })} />
          <input type="text" placeholder="Nom" value={newClient.lastName} onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })} />
          <input type="text" placeholder="Adresse" value={newClient.address} onChange={(e) => setNewClient({ ...newClient, address: e.target.value })} />
          <input type="text" placeholder="Téléphone" value={newClient.phone} onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })} />
          <select value={newClient.gender} onChange={(e) => setNewClient({ ...newClient, gender: e.target.value })}>
            <option value="">Sélectionner le sexe</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
          <input type="number" placeholder="Âge" value={newClient.age} onChange={(e) => setNewClient({ ...newClient, age: e.target.value })} />
          <select value={newClient.role} onChange={(e) => setNewClient({ ...newClient, role: e.target.value })}>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleSave}>Ajouter</button>
        </div>
      )}
      <table className="client-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Sexe</th>
            <th>Âge</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <React.Fragment key={client._id}>
              <tr>
                <td>{client.email}</td>
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.address}</td>
                <td>{client.phone}</td>
                <td>{client.gender}</td>
                <td>{client.age}</td>
                <td>{client.role}</td>
                <td>
                  <button onClick={() => handleEdit(client._id)}>Modifier</button>
                  <button onClick={() => handleDelete(client._id)}>Supprimer</button>
                </td>
              </tr>
              {editingClientId === client._id && (
                <tr>
                  <td colSpan="9">
                    <div>
                      <h3>Modifier le client</h3>
                      <input type="email" value={editedClient.email} onChange={(e) => setEditedClient({ ...editedClient, email: e.target.value })} />
                      <input type="password" value={editedClient.password} onChange={(e) => setEditedClient({ ...editedClient, password: e.target.value })} />
                      <input type="text" value={editedClient.firstName} onChange={(e) => setEditedClient({ ...editedClient, firstName: e.target.value })} />
                      <input type="text" value={editedClient.lastName} onChange={(e) => setEditedClient({ ...editedClient, lastName: e.target.value })} />
                      <input type="text" value={editedClient.address} onChange={(e) => setEditedClient({ ...editedClient, address: e.target.value })} />
                      <input type="text" value={editedClient.phone} onChange={(e) => setEditedClient({ ...editedClient, phone: e.target.value })} />
                      <select value={editedClient.gender} onChange={(e) => setEditedClient({ ...editedClient, gender: e.target.value })}>
                        <option value="">Sélectionner le sexe</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                      </select>
                      <input type="number" value={editedClient.age} onChange={(e) => setEditedClient({ ...editedClient, age: e.target.value })} />
                      <select value={editedClient.role} onChange={(e) => setEditedClient({ ...editedClient, role: e.target.value })}>
                        <option value="client">Client</option>
                        <option value="admin">Admin</option>
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

export default ClientManagement;
