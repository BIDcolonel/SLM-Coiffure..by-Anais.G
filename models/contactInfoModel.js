/**
 * Fichier : contactInfoModel.js
 * Description : Modèle pour les informations de contact de l'application SLM Coiffure...by Anais.G
 * Auteur : BOUDIER Christophe
 */

const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  facebook: { type: String },
});

const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);

module.exports = ContactInfo;
