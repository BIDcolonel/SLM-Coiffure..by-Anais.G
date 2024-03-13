/**
 * Fichier : prestationsRoutes.js
 * Description : Route pour les prestations de l'application SLM Coiffure...by Anais.G
 * Auteur : BOUDIER Christophe
 */

const express = require('express');
const router = express.Router();
const PrestationController = require('../controllers/prestationsController.js');
const verifyToken = require('../middlewares/authMiddleware.js');

// Création d'une prestation
router.post('/create', verifyToken, PrestationController.createPrestation);

// Récupération des prestations
router.get('/read', PrestationController.getPrestations);

// Mise à jour des prestations
router.put('/update/:prestationId', verifyToken, PrestationController.updatePrestation);

// Suppression des prestations
router.delete('/delete/:prestationId', verifyToken, PrestationController.deletePrestation);

module.exports = router;
