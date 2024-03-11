import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../components/css/Contactinfo.css";

const apiUrl = process.env.REACT_APP_API_URL;

const ContactInfo = () => {
  const [contactInfo, setContactInfo] = useState([]);
  const [messageLength, setMessageLength] = useState(0);

  useEffect(() => {
    axios.get(`${apiUrl}/api/contactinfo/read`)
      .then(response => {
        setContactInfo(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations de contact :', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await axios.post(`${apiUrl}/api/contactinfo/send-email`, {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      });
      alert('Message envoyé avec succès !');
      e.target.reset();
      setMessageLength(0);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message :', error);
      alert('Échec de l\'envoi du message. Veuillez réessayer plus tard.');
    }
  };

  const handleMessageChange = (e) => {
    setMessageLength(e.target.value.length);
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Informations de contact</h2>
        {contactInfo.map(info => (
          <div key={info._id}>
            <p>Adresse : {info.address}</p>
            <p>Téléphone : {info.phone}</p>
            {info.email && (
              <p>Email : <a href={`mailto:${info.email}`}>{info.email}</a></p>
            )}
            {info.facebook && (
              <p>Facebook : <a href={info.facebook} target="_blank" rel="noopener noreferrer">{info.facebook}</a></p>
            )}
          </div>
        ))}
      </div>
      <div className="contact-form">
        <h2>Formulaire de contact</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nom et Prénom :</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="email">Email :</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="message">Message :</label>
            <textarea
              id="message"
              name="message"
              maxLength="400"
              required
              style={{ width: '70%', height: '200px', resize: 'none' }}
              onChange={handleMessageChange}
            />
            <p>{messageLength}/400 caractères</p>
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default ContactInfo;
