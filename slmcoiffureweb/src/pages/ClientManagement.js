import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [editedClient, setEditedClient] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(`${apiUrl}/api/users`)
      .then(response => {
        setClients(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des clients:', error);
      });
  }, []);

  const handleEdit = (client) => {
    setEditedClient(client);
    setIsEditing(true);
  };

  const handleUpdate = () => {
    axios.put(`${apiUrl}/api/users/${editedClient._id}`, editedClient)
      .then(() => {
        setIsEditing(false);
        // Mettre à jour la liste des clients après modification
        axios.get(`${apiUrl}/api/users`)
          .then(response => {
            setClients(response.data.data);
          });
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du client:', error);
      });
  };

  const handleDelete = (clientId) => {
    axios.delete(`${apiUrl}/api/users/${clientId}`)
      .then(() => {
        // Mettre à jour la liste des clients après suppression
        setClients(clients.filter(client => client._id !== clientId));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du client:', error);
      });
  };

  return (
    <div>
      <h2>Gestion des clients</h2>
      {clients.map(client => (
        <div key={client._id}>
          <p>Nom: {client.lastName}</p>
          <p>Prénom: {client.firstName}</p>
          <p>Email: {client.email}</p>
          <p>Role: {client.role}</p>
          <button onClick={() => handleEdit(client)}>Modifier</button>
          <button onClick={() => handleDelete(client._id)}>Supprimer</button>
        </div>
      ))}
      {isEditing && (
        <div>
          <h3>Modifier le client</h3>
          <input type="text" value={editedClient.firstName} onChange={(e) => setEditedClient({ ...editedClient, firstName: e.target.value })} />
          <input type="text" value={editedClient.lastName} onChange={(e) => setEditedClient({ ...editedClient, lastName: e.target.value })} />
          <input type="email" value={editedClient.email} onChange={(e) => setEditedClient({ ...editedClient, email: e.target.value })} />
          <input type="text" value={editedClient.phone} onChange={(e) => setEditedClient({ ...editedClient, phone: e.target.value })} />
          <button onClick={handleUpdate}>Enregistrer</button>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;
