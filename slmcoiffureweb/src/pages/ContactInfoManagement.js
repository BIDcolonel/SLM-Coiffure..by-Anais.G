import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const ContactInfoManagement = () => {
  const [contactInfo, setContactInfo] = useState([]);
  const [editedContactInfo, setEditedContactInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = () => {
    axios.get(`${apiUrl}/api/contactinfo/read`)
      .then(response => {
        setContactInfo(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations de contact:', error);
      });
  };

  const handleEdit = (info) => {
    setEditedContactInfo(info);
    setIsEditing(true);
  };

  const handleUpdate = () => {
    axios.put(`${apiUrl}/api/contactinfo/update/${editedContactInfo._id}`, editedContactInfo)
      .then(() => {
        setIsEditing(false);
        fetchContactInfo();
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour des informations de contact:', error);
      });
  };

  return (
    <div>
      <h2>Gestion des informations de contact</h2>
      <table className="contact-info-table">
        <thead>
          <tr>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>Facebook</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactInfo.map(info => (
            <React.Fragment key={info._id}>
              <tr>
                <td>{info.address}</td>
                <td>{info.phone}</td>
                <td>{info.email}</td>
                <td>{info.facebook}</td>
                <td>
                  <button onClick={() => handleEdit(info)}>Modifier</button>
                </td>
              </tr>
              {isEditing && editedContactInfo._id === info._id && (
                <tr>
                  <td colSpan="5">
                    <div>
                      <h3>Modifier les informations de contact</h3>
                      <input type="text" value={editedContactInfo.address} onChange={(e) => setEditedContactInfo({ ...editedContactInfo, address: e.target.value })} />
                      <input type="text" value={editedContactInfo.phone} onChange={(e) => setEditedContactInfo({ ...editedContactInfo, phone: e.target.value })} />
                      <input type="email" value={editedContactInfo.email} onChange={(e) => setEditedContactInfo({ ...editedContactInfo, email: e.target.value })} />
                      <input type="text" value={editedContactInfo.facebook} onChange={(e) => setEditedContactInfo({ ...editedContactInfo, facebook: e.target.value })} />
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

export default ContactInfoManagement;
