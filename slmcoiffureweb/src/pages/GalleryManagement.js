import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const GalleryManagement = () => {
  const [photos, setPhotos] = useState([]);
  const [editedPhoto, setEditedPhoto] = useState({});
  const [newPhoto, setNewPhoto] = useState({ title: '', imageUrl: '', description: '', tags: [] });
  const [editingPhotoId, setEditingPhotoId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = () => {
    axios.get(`${apiUrl}/api/gallery/read`)
      .then(response => {
        setPhotos(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des photos:', error);
      });
  };

  const handleEdit = (photoId) => {
    const photoToEdit = photos.find(photo => photo._id === photoId);
    setEditedPhoto(photoToEdit);
    setEditingPhotoId(photoId);
  };

  const handleUpdate = () => {
    axios.put(`${apiUrl}/api/gallery/update/${editedPhoto._id}`, editedPhoto)
      .then(() => {
        setEditingPhotoId(null);
        fetchPhotos();
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la photo:', error);
      });
  };

  const handleDelete = (photoId) => {
    axios.delete(`${apiUrl}/api/gallery/delete/${photoId}`)
      .then(() => {
        fetchPhotos();
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la photo:', error);
      });
  };

  const handleCreate = () => {
    setIsCreating(prevState => !prevState);
    if (!isCreating) {
      setNewPhoto({ title: '', imageUrl: '', description: '', tags: [] });
    }
  };

  const handleSave = () => {
    axios.post(`${apiUrl}/api/gallery/create`, newPhoto)
      .then(response => {
        setPhotos([...photos, response.data.data]);
        setIsCreating(false);
      })
      .catch(error => {
        console.error('Erreur lors de la création de la photo:', error);
      });
  };

  return (
    <div>
      <h2>Gestion de la galerie</h2>
      <button onClick={handleCreate}>{isCreating ? 'Annuler' : 'Ajouter une nouvelle photo'}</button>
      {isCreating && (
        <div>
          <h3>Ajouter une nouvelle photo</h3>
          <input type="text" placeholder="Titre" value={newPhoto.title} onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })} />
          <input type="text" placeholder="URL de l'image" value={newPhoto.imageUrl} onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })} />
          <input type="text" placeholder="Description" value={newPhoto.description} onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })} />
          <input type="text" placeholder="Tags (séparés par des virgules)" value={newPhoto.tags.join(',')} onChange={(e) => setNewPhoto({ ...newPhoto, tags: e.target.value.split(',') })} />
          <button onClick={handleSave}>Ajouter</button>
        </div>
      )}
      <table className="gallery-table">
        <tbody>
          {photos.reduce((rows, photo, index) => {
            if (index % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(
              <td key={photo._id}>
                <img src={photo.imageUrl} alt={photo.title} className="gallery-image" />
                <p>Titre: {photo.title}</p>
                <p>Description: {photo.description}</p>
                <p>Tags: {photo.tags.join(', ')}</p>
                {editingPhotoId === photo._id ? (
                  <div>
                    <h3>Modifier la photo</h3>
                    <input type="text" value={editedPhoto.title} onChange={(e) => setEditedPhoto({ ...editedPhoto, title: e.target.value })} />
                    <input type="text" value={editedPhoto.imageUrl} onChange={(e) => setEditedPhoto({ ...editedPhoto, imageUrl: e.target.value })} />
                    <input type="text" value={editedPhoto.description} onChange={(e) => setEditedPhoto({ ...editedPhoto, description: e.target.value })} />
                    <input type="text" value={editedPhoto.tags.join(',')} onChange={(e) => setEditedPhoto({ ...editedPhoto, tags: e.target.value.split(',') })} />
                    <button onClick={handleUpdate}>Enregistrer</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEdit(photo._id)}>Modifier</button>
                    <button onClick={() => handleDelete(photo._id)}>Supprimer</button>
                  </div>
                )}
              </td>
            );
            return rows;
          }, []).map((row, index) => <tr key={index}>{row}</tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default GalleryManagement;
