import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import "../components/css/ReviewList.css";

const apiUrl = process.env.REACT_APP_API_URL;

const ReviewListPage = () => {
  const [avis, setAvis] = useState([]);

  useEffect(() => {
    // Récupérer les avis depuis l'API
    axios.get(`${apiUrl}/api/reviews/read`)
      .then(response => {
        setAvis(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des avis:', error);
      });
  }, []);

  return (
    <div className="avis-container">
      <h2>Avis des clients</h2>
      <div className="avis-list">
        {avis.map(av => (
          <div key={av._id} className="avis-item">
            <h3>{`${av.clientFirstName} ${av.clientLastName}`}</h3>
            <StarRatings
              rating={av.rating}
              starRatedColor="#ffc107"
              starDimension="20px"
              starSpacing="2px"
            />
            <p>{av.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewListPage;
