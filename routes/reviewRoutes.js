/**
 * Fichier : reviewRoutes.js
 * Description : Route pour les avis de l'application SLM Coiffure...by Anais.G
 * Auteur : BOUDIER Christophe
 */

const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController.js');
const verifyToken = require('../middlewares/authMiddleware.js');

// Création d'un avis
router.post('/create', verifyToken, ReviewController.createReview);

// Récupération des avis
router.get('/read', ReviewController.getReviews);

// Mise à jour des avis
router.put('/update/:reviewId', verifyToken, ReviewController.updateReview);

// Suppression des avis
router.delete('/delete/:reviewId', verifyToken, ReviewController.deleteReview);

module.exports = router;
