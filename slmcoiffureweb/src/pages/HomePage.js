import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/css/Home.css';
import ReviewListPage from './ReviewListPage';
import ReviewFormPage from './ReviewFormPage';

const apiUrl = process.env.REACT_APP_API_URL;

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Service de récupération des avis
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/reviews/read`);
        setReviews(response.data);
      } catch (error) {
        console.error('Erreur dans l\'extraction des avis :', error);
      }
    };

    fetchReviews();
  }, []);

    // Authentification
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(token ? true : false);
    }, []);

  // Affichage de la page d'accueil
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Bienvenue chez SLM Coiffure... by Anaïs.G</h1>
        <p>Là où le style rencontre la commodité - Votre destination ultime pour les soins capillaires.</p>
        {isLoggedIn && (
        <a href="/reservation"><button class="book-now-button">Réservez maintenant</button></a>
        )}
      </div>

      <div className="about-section">
        <h2>SALON DE COIFFURE</h2>
        <p>
          Poussez les portes du salon SLM Coiffure et profitez de l’expertise de notre coiffeuse lors d’un moment dédié à votre beauté. La passion et le savoir-faire se rencontrent aux salons SLM Coiffure pour vous faire redécouvrir votre beauté dans un cadre chaleureux et authentique.
        </p>
        <p>
          Chaque femme qui franchit les portes du salon SLM Coiffure est unique et en ressort sublimée par notre coiffeuse à l’écoute de ses besoins et ses envies. Venez passer un agréable moment et offrez-vous, ainsi qu’à vos cheveux, le meilleur.
        </p>
      </div>

      <div className="facebook-section">
        <h2>Dernière publication Facebook</h2>
        {/* Intégration de la dernière publication Facebook */}
        <iframe
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fslm.coiffure.by.anais.g%2Fposts%2Fpfbid02iwX79Vn1GiLYYqQv871CrzWGEmMGXAf4KMCQP2zphfzvUCxbNoBpTfs35UUeGsSQl&show_text=true&width=500"
          width="500"
          height="498"
          style={{ border: 'none', overflow: 'hidden' }}
          title="Dernière publication Facebook"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        ></iframe>
      </div>

      <div className='reviews-section'>
        {isLoggedIn && (
          <div className='reviews-section'>
            <ReviewFormPage />
          </div>
        )}
        <ReviewListPage reviews={reviews} />
      </div>
    </div>
  );
};

export default HomePage;
