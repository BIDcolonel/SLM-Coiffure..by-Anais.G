const express = require('express');
const router = express.Router();
const PrestationController = require('../controllers/prestationsController.js');

// Création d'une prestation
router.post('/create', PrestationController.createPrestation);

// Récupération des prestations
router.get('/read', PrestationController.getPrestations);

// Mise à jour des prestations
router.put('/update/:prestationId', PrestationController.updatePrestation);

// Suppression des prestations
router.delete('/delete/:prestationId', PrestationController.deletePrestation);

module.exports = router;
