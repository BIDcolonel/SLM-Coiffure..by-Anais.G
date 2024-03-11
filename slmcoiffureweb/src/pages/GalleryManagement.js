import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const GalleryManagement = () => {
  const [photos, setPhotos] = useState([]);
  const [editedPhoto, setEditedPhoto] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(`${apiUrl}/api/gallery`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setPhotos(response.data);
        } else {
          console.error('Les données de la galerie ne sont pas un tableau:', response.data);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des photos de la galerie:', error);
      });
  }, []);

  const handleEdit = (photo) => {
    setEditedPhoto(photo);
    setIsEditing(true);
  };

  const handleUpdate = () => {
    axios.put(`${apiUrl}/api/gallery/${editedPhoto._id}`, editedPhoto)
      .then(() => {
        setIsEditing(false);
        // Mettre à jour la liste des photos après modification
        axios.get(`${apiUrl}/api/gallery`)
          .then(response => {
            setPhotos(response.data);
          });
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la photo:', error);
      });
  };

  const handleDelete = (photoId) => {
    axios.delete(`${apiUrl}/api/gallery/${photoId}`)
      .then(() => {
        // Mettre à jour la liste des photos après suppression
        setPhotos(photos.filter(photo => photo._id !== photoId));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la photo:', error);
      });
  };

  return (
    <div>
      <h2>Gestion de la galerie</h2>
      <ul>
        {photos.map(photo => (
          <li key={photo._id}>
            <img src={photo.imageUrl} alt={photo.title} />
            <p>{photo.title}</p>
            <p>{photo.description}</p>
            <p>Tag: {photo.tag}</p>
            <button onClick={() => handleEdit(photo)}>Modifier</button>
            <button onClick={() => handleDelete(photo._id)}>Supprimer</button>
          </li>
        ))}

      </ul>
      {isEditing && (
        <div>
          <h3>Modifier la photo</h3>
          <input type="text" value={editedPhoto.title} onChange={(e) => setEditedPhoto({ ...editedPhoto, title: e.target.value })} />
          <input type="text" value={editedPhoto.description} onChange={(e) => setEditedPhoto({ ...editedPhoto, description: e.target.value })} />
          <input type="text" value={editedPhoto.tag} onChange={(e) => setEditedPhoto({ ...editedPhoto, tag: e.target.value })} />
          <button onClick={handleUpdate}>Enregistrer</button>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
