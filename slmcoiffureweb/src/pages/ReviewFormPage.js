import React, { useState } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import '../components/css/ReviewForm.css';

const ReviewFormPage = ({ user }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews/create', {
        userId: user.id,
        name: user.name,
        rating,
        comment
      });
      alert('Votre avis a été soumis avec succès ! Merci.');
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Erreur lors de la soumission de l\'avis:', error);
      alert('Erreur lors de la soumission de l\'avis. Veuillez réessayer.');
    }
  };

  return (
    <div className="review-container">
      <h2>Laisser un avis</h2>
      <form className="review-form" onSubmit={handleSubmit}>
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
