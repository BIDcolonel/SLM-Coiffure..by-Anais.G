import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/css/Login.css';
import { useAuth } from '../utils/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Formulaire soumis avec les données suivantes:', formData);
      const response = await axios.post(`${apiUrl}/api/users/login`, formData);
      console.log('Réponse du serveur:', response.data);
      if (response.status === 200 && response.data.success) {
        console.log('Connexion réussie. Token reçu:', response.data.token);
        localStorage.setItem('token', response.data.token);
        login(response.data.token);
        console.log('Redirection vers la page principale...');
        navigate('/');
      } else {
        setError('Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Une erreur s\'est produite lors de la connexion. Veuillez réessayer.');
    }
  };

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
