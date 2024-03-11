const mongoose = require('mongoose');

const galleryPhotoSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Validation de l'URL de l'image
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: props => `${props.value} n'est pas une URL valide pour une image!`
    }
  },
  description: { type: String, maxlength: 500 },
  tags: [{ type: String }],
});

// Indexation pour optimisation des performances
galleryPhotoSchema.index({ title: 'text', tags: 'text' });

const GalleryPhoto = mongoose.model('GalleryPhoto', galleryPhotoSchema);

module.exports = GalleryPhoto;
