/**
 * Fichier : userModel.js
 * Description : Modèle pour les utilisateurs de l'application SLM Coiffure...by Anais.G
 * Auteur : BOUDIER Christophe
 */

const mongoose = require('mongoose');
const validator = require('validator');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "L'e-mail ne peut être vide"],
    validate: [validator.isEmail, "L'e-mail n'est pas valide"] // Utilisation de la librairie validator pour valider l'e-mail
  },
  password: {
    type: String,
    required: [true, "Le mot de passe ne peut être vide"],
    validate: { // Validation du mot de passe
      validator: function(value) {
        return /^.{8,}$/.test(value);
      },
      message: `Le mot de passe doit contenir au moins 8 caractères.`
    }
  },
  firstName: {type: String, required: [true, "ne peut être vide"], match: [/^[a-zA-ZÀ-ÿ\-']+$/, 'est valide']},
  lastName: {type: String, required: [true, "ne peut être vide"], match: [/^[a-zA-ZÀ-ÿ\-']+$/, 'est valide']},
  address: {
    type: String,
    required: [true, "L'adresse ne peut être vide"],
    match: [/^[a-zA-Z0-9\s,'-]+$/, "Le format de l'adresse n'est pas valide"]
  },
  phone: {
    type: String,
    required: [true, "Le numéro de téléphone ne peut être vide"],
    validate: {
      validator: function(value) {
        return /^\d{10}$/.test(value);
      },
      message: "Le format du numéro de téléphone n'est pas valide"
    }
  },
  gender: {
    type: String,
    required: true,
    enum: ['Homme', 'Femme'],
  },
  age: {
    type: Number,
    required: true,
    min: [1, "L'âge minimum requis est de 1 ans"],
  },
  role: { type: String, required: true, enum: ['client', 'admin'], default: 'client' },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
