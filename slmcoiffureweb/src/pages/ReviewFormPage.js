import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate pour gérer les redirections
import '../components/css/ReviewForm.css';

const ReviewFormPage = ({ user }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  useEffect(() => {
    // Vérifier si l'utilisateur est identifié
    if (!user || !user.id) {
      // Rediriger vers la page de connexion
      navigate('/login'); // Utilisation de navigate pour rediriger
    }
  }, [user, navigate]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews/create', {
        userId: user.id,
        firstName,
        lastName,
        rating,
        comment
      });
      alert('Votre avis a été soumis avec succès ! Merci.');
      setRating(0);
      setComment('');
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.error('Erreur lors de la soumission de l\'avis:', error);
      alert('Erreur lors de la soumission de l\'avis. Veuillez réessayer.');
    }
  };

  return (
    <div className="review-container">
      <h2>Laisser un avis</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="name-fields">
          <div>
            <label>Prénom :</label>
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
          </div>
          <div>
            <label>Nom :</label>
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
          </div>
        </div>
        <div className="star-ratings">
          <label>Note :</label>
          <StarRatings
            rating={rating}
            starRatedColor="gold"
            changeRating={handleRatingChange}
            numberOfStars={5}
            name='rating'
          />
        </div>
        <div>
          <label>Commentaire :</label>
          <textarea
            className="comment-textarea"
            value={comment}
            onChange={handleCommentChange}
            required
          />
        </div>
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default ReviewFormPage;
