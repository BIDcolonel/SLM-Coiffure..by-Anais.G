/**
 * Fichier : authMiddleware.js
 * Description : Middleware pour vérifier et extraire l'ID de l'utilisateur à partir du token JWT
 * Auteur : BOUDIER Christophe
 */

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'Token manquant' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token non valide' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;
