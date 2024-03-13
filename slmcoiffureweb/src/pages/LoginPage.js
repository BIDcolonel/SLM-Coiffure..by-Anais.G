import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import '../components/css/Login.css';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/users/login`, formData);
      console.log(response)
      if (response.status === 200 && response.data.success) {
        // Stocker le token dans le localStorage
        localStorage.setItem('token', response.data.token);
        console.log(localStorage)
        // Appeler la fonction onLogin avec les données de l'utilisateur si la connexion est réussie
        onLogin(response.data);
        // Activer la redirection vers la page d'accueil si la connexion est réussie
        setRedirectToHome(true);
      } else {
        setError('Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Une erreur s\'est produite lors de la connexion. Veuillez réessayer.');
    }
  };

  // Redirection vers la page d'accueil si la connexion est réussie
  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <div className="password-container">
          <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" required />
          {/* Bouton pour basculer l'affichage du mot de passe */}
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? 'Masquer' : 'Afficher'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
      <div className="login-links">
        <Link to="/signup">Inscription</Link>
        <Link to="/reset-password">Réinitialiser le mot de passe</Link>
      </div>
    </div>
  );
};

export default LoginPage;
