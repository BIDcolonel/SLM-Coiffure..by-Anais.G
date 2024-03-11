/**
 * Fichier : reviewRoutes.js
 * Description : Route pour les avis de l'application SLM Coiffure...by Anais.G
 * Auteur : BOUDIER Christophe
 */

const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController.js');

// Création d'un avis
router.post('/create', ReviewController.createReview);

// Récupération des avis
router.get('/read', ReviewController.getReviews);

// Mise à jour des avis
router.put('/update/:reviewId', ReviewController.updateReview);

// Suppression des avis
router.delete('/delete/:reviewId', ReviewController.deleteReview);

module.exports = router;
