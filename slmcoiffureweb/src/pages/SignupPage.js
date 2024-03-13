import React, { useState } from 'react';
import axios from 'axios';
import '../components/css/Signup.css';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    gender: '',
    age: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/users/create`, formData);
      console.log(response.data);
      // Redirection vers la page de connexion après la réussite de la création de compte
      navigate('/login');
    } catch (error) {
      console.error('Erreur de création de l\'utilisateur:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" required />
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Prénom" required />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Nom" required />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Adresse" required />
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Téléphone" required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Choisir le genre</option>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
        </select>
        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Âge" required />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignupPage;
