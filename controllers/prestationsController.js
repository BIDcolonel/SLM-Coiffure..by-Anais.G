/**
 * Fichier : prestationsController.js
 * Description : Contrôleur pour les prestations de l'application SLM Coiffure...by Anais.G
 * Auteur : BOUDIER Christophe
 */

const Prestation = require('../models/prestationsModel');

// Contrôleur pour la création d'une prestation
exports.createPrestation = async (req, res) => {
  try {
    const newPrestation = await Prestation.create(req.body);
    res.status(201).json({ success: true, data: newPrestation });
  } catch (error) {
    console.error("Error creating prestation:", error);
    res.status(500).json({ success: false, error: "Impossible de créer la prestation" });
  }
};

// Contrôleur pour récupérer les prestations
exports.getPrestations = async (req, res) => {
  try {
    const prestations = await Prestation.find();
    res.status(200).json({ success: true, data: prestations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Contrôleur pour mettre à jour une prestation
exports.updatePrestation = async (req, res) => {
  try {
    const updatedPrestation = await Prestation.findByIdAndUpdate(req.params.prestationId, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedPrestation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Contrôleur pour supprimer une prestation
exports.deletePrestation = async (req, res) => {
  try {
    await Prestation.findByIdAndDelete(req.params.prestationId);
    res.status(200).json({ success: true, message: 'Prestation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
