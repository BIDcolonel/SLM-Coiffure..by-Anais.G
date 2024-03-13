/**
 * Fichier : galleryRoutes.js
 * Description : Route pour les images de la galerie de l'application SLM Coiffure...by Anais.G
 * Auteur : BOUDIER Christophe
 */

const express = require('express');
const router = express.Router();
const GalleryController = require('../controllers/galleryController.js');
const verifyToken = require('../middlewares/authMiddleware.js');

// Ajout d'une image à la galerie
router.post('/create', verifyToken, GalleryController.addImageToGallery);

// Récupération des images de la galerie
router.get('/read', GalleryController.getGalleryImages);

// Mise à jour des images de la galerie
router.put('/update/:galleryId', verifyToken, GalleryController.updateGalleryImage);

// Suppression des images de la galerie
router.delete('/delete/:galleryId', verifyToken, GalleryController.deleteGalleryImage);

module.exports = router;
