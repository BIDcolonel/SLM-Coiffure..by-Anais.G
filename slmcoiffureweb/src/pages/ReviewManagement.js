import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [editedReview, setEditedReview] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(`${apiUrl}/api/reviews`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des avis:', error);
      });
  }, []);

  const handleEdit = (review) => {
    setEditedReview(review);
    setIsEditing(true);
  };

  const handleUpdate = () => {
    axios.put(`${apiUrl}/api/reviews/${editedReview._id}`, editedReview)
      .then(() => {
        setIsEditing(false);
        // Mettre à jour la liste des avis après modification
        axios.get(`${apiUrl}/api/reviews`)
          .then(response => {
            setReviews(response.data);
          });
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de l\'avis:', error);
      });
  };

  const handleDelete = (reviewId) => {
    axios.delete(`${apiUrl}/api/reviews/${reviewId}`)
      .then(() => {
        // Mettre à jour la liste des avis après suppression
        setReviews(reviews.filter(review => review._id !== reviewId));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'avis:', error);
      });
  };

  return (
    <div>
      <h2>Gestion des avis</h2>
      <ul>
        {reviews.map(review => (
          <li key={review._id}>
            <p>Nom du client: {review.clientFirstName} {review.clientLastName}</p>
            <p>Note: {review.rating}</p>
            <p>Commentaire: {review.comment}</p>
            <button onClick={() => handleEdit(review)}>Modifier</button>
            <button onClick={() => handleDelete(review._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      {isEditing && (
        <div>
          <h3>Modifier l'avis</h3>
          <input type="text" value={editedReview.clientFirstName} onChange={(e) => setEditedReview({ ...editedReview, clientFirstName: e.target.value })} />
          <input type="text" value={editedReview.clientLastName} onChange={(e) => setEditedReview({ ...editedReview, clientLastName: e.target.value })} />
          <input type="number" value={editedReview.rating} onChange={(e) => setEditedReview({ ...editedReview, rating: e.target.value })} />
          <input type="text" value={editedReview.comment} onChange={(e) => setEditedReview({ ...editedReview, comment: e.target.value })} />
          <button onClick={handleUpdate}>Enregistrer</button>
        </div>
      )}
    </div>
  );
};

export default ReviewManagement;
