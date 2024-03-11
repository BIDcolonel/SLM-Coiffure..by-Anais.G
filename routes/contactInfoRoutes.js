const express = require('express');
const router = express.Router();
const ContactInfoController = require('../controllers/contactInfoController.js');

// Création des informations de contact
router.post('/create', ContactInfoController.createContactInfo);

// Récupération des informations de contact
router.get('/read', ContactInfoController.getContactInfo);

// Mise à jour des informations de contact
router.put('/update/:contactId', ContactInfoController.updateContactInfo);

// Suppression des informations de contact
router.delete('/delete/:contactId', ContactInfoController.deleteContactInfo);

// Envoi d'un email
router.post('/send-email', ContactInfoController.sendEmail);

module.exports = router;
