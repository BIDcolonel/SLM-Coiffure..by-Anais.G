import React, { useState, useEffect } from 'react'; // Importation des hooks useState et useEffect depuis React
import { Link } from 'react-router-dom';
import './css/Header.css';

const Header = ({ user, onLogout, isAdmin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Authentification
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token ? true : false);
  }, []);

  return (
    <header>
      <div className="logo">
        <a href="/"><img src="./images/logo_SLM.png" alt="Salon de coiffure"></img></a>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/prestations">Nos prestations</Link></li>
          <li><Link to="/gallery">Galerie</Link></li>
          {isLoggedIn && (
            <li><Link to="/reservation">Réservation</Link></li>
          )}
          <li><Link to="/contact">Contact</Link></li>
          {user ? (
            <>
              <li><Link to="/profile">Profil</Link></li>
              <li><button onClick={onLogout}>Déconnexion</button></li>
            </>
          ) : (
            <li><Link to="/login">Connexion</Link></li>
          )}
          {isAdmin && isLoggedIn && (
            <li><Link to="/admin">Administrateur</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
