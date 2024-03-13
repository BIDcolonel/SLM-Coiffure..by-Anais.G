/**
 * Fichier : authMiddleware.js
 * Description : Middleware pour vérifier et extraire l'ID de l'utilisateur à partir du token JWT
 * Auteur : BOUDIER Christophe
 */

const jwt = require('jsonwebtoken');

exports.extractUserId = (req, res, next) => {
  // Extraire le token JWT du header de la requête
  const token = req.headers.authorization;

  // Vérifier si le token est présent
  if (!token) {
    return res.status(401).json({ success: false, error: 'Token non fourni' });
  }

  try {
    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extraire l'ID de l'utilisateur à partir du token décodé
    req.userId = decoded.id;

    // Passer à la prochaine middleware
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Token invalide' });
  }
};
