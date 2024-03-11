const Review = require('../models/reviewModel.js');

// Contrôleur pour la création d'un nouvel avis
exports.createReview = async (req, res) => {
  try {
    const { clientFirstName, clientLastName, rating, comment } = req.body;
    const newReview = await Review.create({
      clientFirstName,
      clientLastName,
      rating,
      comment
    });
    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ success: false, error: "Impossible de créer l'avis" });
  }
};

// Contrôleur pour récupérer les avis
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Contrôleur pour mettre à jour un avis
exports.updateReview = async (req, res) => {
  try {
    const { clientFirstName, clientLastName, rating, comment } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(req.params.reviewId, {
      clientFirstName,
      clientLastName,
      rating,
      comment
    }, { new: true });
    res.status(200).json({ success: true, data: updatedReview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Contrôleur pour supprimer un avis
exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.reviewId);
    res.status(200).json({ success: true, message: 'Avis supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Exporter les fonctions du contrôleur
module.exports = exports;
