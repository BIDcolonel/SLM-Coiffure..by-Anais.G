/**
 * Fichier : reviewModel.js
 * Description : Modèle pour les avis de l'application SLM Coiffure...by Anais.G
 * Auteur : BOUDIER Christophe
 */

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  clientFirstName: { type: String, required: true },
  clientLastName: { type: String, required: true },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} n\'est pas une valeur entière pour la notation',
    },
    index: true },
  comment: { type: String, maxlength: 500 },
  createdAt: { type: Date, required: true, default: Date.now, index: true },
}, {timestamps: true});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
