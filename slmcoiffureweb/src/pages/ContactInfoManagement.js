import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const ContactInfoManagement = () => {
  const [contactInfo, setContactInfo] = useState({});
  const [editedContactInfo, setEditedContactInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(`${apiUrl}/api/contactinfo`)
      .then(response => {
        setContactInfo(response.data);
        setEditedContactInfo(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations de contact:', error);
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    axios.put(`${apiUrl}/api/contactinfo`, editedContactInfo)
      .then(() => {
        setIsEditing(false);
        // Mettre à jour les informations de contact après modification
        setContactInfo(editedContactInfo);
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour des informations de contact:', error);
      });
  };

  return (
    <div>
      <h2>Gestion des informations de contact</h2>
      {!isEditing ? (
        <div>
          <p>Adresse: {contactInfo.address}</p>
          <p>Téléphone: {contactInfo.phone}</p>
          <p>Email: {contactInfo.email}</p>
          <p>Facebook: {contactInfo.facebook}</p>
          <button onClick={handleEdit}>Modifier</button>
        </div>
      ) : (
        <div>
          <input type="text" value={editedContactInfo.address} onChange={(e) => setEditedContactInfo({ ...editedContactInfo, address: e.target.value })} />
          <input type="text" value={editedContactInfo.phone} onChange={(e) => setEditedContactInfo({ ...editedContactInfo, phone: e.target.value })} />
          <input type="email" value={editedContactInfo.email} onChange={(e) => setEditedContactInfo({ ...editedContactInfo, email: e.target.value })} />
          <input type="text" value={editedContactInfo.facebook} onChange={(e) => setEditedContactInfo({ ...editedContactInfo, facebook: e.target.value })} />
          <button onClick={handleUpdate}>Enregistrer</button>
        </div>
      )}
    </div>
  );
};

export default ContactInfoManagement;
