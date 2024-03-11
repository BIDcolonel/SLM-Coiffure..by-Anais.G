/**
 * Fichier : prestationsModel.js
 * Description : Modèle pour les prestations de l'application SLM Coiffure...by Anais.G
 * Auteur : BOUDIER Christophe
 */

const mongoose = require('mongoose');

const prestationsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  clientTypes: [{ type: String, enum: ['Homme', 'Femme', 'Enfant'], required: true, index: true}],
  hairLength: { type: String, enum: ['Court', 'Mi-long', 'Long'], index: true},
  isActive: { type: Boolean, default: true },
});

const Prestation = mongoose.model('Prestations', prestationsSchema);

module.exports = Prestation;
