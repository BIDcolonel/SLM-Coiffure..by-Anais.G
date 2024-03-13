/**
 * Fichier : jwtUtils.js
 * Description : Utilitaire pour générer un token JWT
 * Auteur : BOUDIER Christophe
 */

const jwt = require('jsonwebtoken');

function generateJWTToken(email) {
  // Générer un token JWT avec une durée de validité
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 5 * 60 });
  return token;
}

module.exports = { generateJWTToken };
