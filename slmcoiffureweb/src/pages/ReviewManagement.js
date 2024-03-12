import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [editedReview, setEditedReview] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null); // Ajout de l'état pour stocker l'ID de l'avis sélectionné pour la modification
  const [isCreating, setIsCreating] = useState(false);
  const [newReview, setNewReview] = useState({ clientFirstName: '', clientLastName: '', rating: '', comment: '' });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    axios.get(`${apiUrl}/api/reviews/read`)
      .then(response => {
        setReviews(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des avis:', error);
      });
  };

  const handleEdit = (review) => {
    setEditedReview(review);
    setIsEditing(true);
    setSelectedReviewId(review._id); // Mettre à jour l'ID de l'avis sélectionné
  };

  const handleUpdate = () => {
    axios.put(`${apiUrl}/api/reviews/update/${editedReview._id}`, editedReview)
      .then(() => {
        setIsEditing(false);
        fetchReviews();
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de l\'avis:', error);
      });
  };

  const handleDelete = (reviewId) => {
    axios.delete(`${apiUrl}/api/reviews/delete/${reviewId}`)
      .then(() => {
        setReviews(reviews.filter(review => review._id !== reviewId));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'avis:', error);
      });
  };

  const handleCreate = () => {
    setIsCreating(prevState => !prevState);
    if (!isCreating) {
      setNewReview({ clientFirstName: '', clientLastName: '', rating: '', comment: '' });
    }
  };

  const handleSave = () => {
    axios.post(`${apiUrl}/api/reviews/create`, newReview)
      .then(response => {
        setReviews([...reviews, response.data.data]);
        setIsCreating(false);
      })
      .catch(error => {
        console.error('Erreur lors de la création de l\'avis:', error);
      });
  };

  return (
    <div>
      <h2>Gestion des avis</h2>
      <button onClick={handleCreate}>{isCreating ? 'Annuler' : 'Ajouter un avis'}</button>
      {isCreating && (
        <div>
          <h3>Ajouter un avis</h3>
          <input type="text" placeholder="Prénom du client" value={newReview.clientFirstName} onChange={(e) => setNewReview({ ...newReview, clientFirstName: e.target.value })} />
          <input type="text" placeholder="Nom du client" value={newReview.clientLastName} onChange={(e) => setNewReview({ ...newReview, clientLastName: e.target.value })} />
          <input type="number" placeholder="Note" value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })} />
          <input type="text" placeholder="Commentaire" value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} />
          <button onClick={handleSave}>Ajouter</button>
        </div>
      )}
      <table className="review-table">
        <thead>
          <tr>
            <th>Prénom du client</th>
            <th>Nom du client</th>
            <th>Note</th>
            <th>Commentaire</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <React.Fragment key={review._id}>
              <tr>
                <td>{review.clientFirstName}</td>
                <td>{review.clientLastName}</td>
                <td>{review.rating}</td>
                <td>{review.comment}</td>
                <td>
                  <button onClick={() => handleEdit(review)}>Modifier</button>
                  <button onClick={() => handleDelete(review._id)}>Supprimer</button>
                </td>
              </tr>
              {isEditing && selectedReviewId === review._id && (
                <tr>
                  <td colSpan="5">
                    <div>
                      <h3>Modifier l'avis</h3>
                      <input type="text" value={editedReview.clientFirstName} onChange={(e) => setEditedReview({ ...editedReview, clientFirstName: e.target.value })} />
                      <input type="text" value={editedReview.clientLastName} onChange={(e) => setEditedReview({ ...editedReview, clientLastName: e.target.value })} />
                      <input type="number" value={editedReview.rating} onChange={(e) => setEditedReview({ ...editedReview, rating: e.target.value })} />
                      <input type="text" value={editedReview.comment} onChange={(e) => setEditedReview({ ...editedReview, comment: e.target.value })} />
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

export default ReviewManagement;
