import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

const Header = ({ user, onLogout }) => {
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
          <li><Link to="/reservation">Réservation</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {user ? (
            <>
              <li><Link to="/profile">Profil</Link></li>
              <li><button onClick={onLogout}>Déconnexion</button></li>
            </>
          ) : (
            <li><Link to="/login">Connexion</Link></li>
          )}
          <li><Link to="/admin">Administrateur</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
