/**
 * Fichier : galleryController.js
 * Description : Contrôleur pour la galerie de photos de l'application SLM Coiffure...by Anais.G
 * Auteur : BOUDIER Christophe
 */

const GalleryPhoto = require('../models/galleryModel');

// Contrôleur pour ajouter une image à la galerie
exports.addImageToGallery = async (req, res) => {
  try {
    const { title, imageUrl, description, tags } = req.body;
    const nouvelleImage = await GalleryPhoto.create({
      title,
      imageUrl,
      description,
      tags
    });
    res.status(201).json({ success: true, data: nouvelleImage });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'image à la galerie :", error);
    res.status(500).json({ success: false, error: "Impossible d'ajouter l'image à la galerie" });
  }
};

// Contrôleur pour récupérer les images de la galerie
exports.getGalleryImages = async (req, res) => {
  try {
    const images = await GalleryPhoto.find();
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Contrôleur pour mettre à jour une image de la galerie
exports.updateGalleryImage = async (req, res) => {
  try {
    const { title, imageUrl, description, tags } = req.body;
    const imageMiseAJour = await GalleryPhoto.findByIdAndUpdate(req.params.galleryId, {
      title,
      imageUrl,
      description,
      tags
    }, { new: true });
    res.status(200).json({ success: true, data: imageMiseAJour });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Contrôleur pour supprimer une image de la galerie
exports.deleteGalleryImage = async (req, res) => {
  try {
    await GalleryPhoto.findByIdAndDelete(req.params.galleryId);
    res.status(200).json({ success: true, message: 'Image de la galerie supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
