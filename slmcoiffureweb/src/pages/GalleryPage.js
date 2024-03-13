import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../components/css/Gallery.css"

const apiUrl = process.env.REACT_APP_API_URL;

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Récupérer les images depuis l'API
    axios.get(`${apiUrl}/api/gallery/read`)
      .then(response => {
        setImages(response.data.data);
        setFilteredImages(response.data.data);
        // Récupérer tous les tags disponibles
        const allTags = response.data.data.flatMap(image => image.tags);
        // Filtrer les tags pour ne conserver que ceux qui ne sont pas vides
        const filteredTags = allTags.filter(tag => tag.trim() !== '');
        setTags([...new Set(filteredTags)]); // Supprimer les doublons de tags
      })
      .catch(error => {
        console.error('Error fetching gallery images:', error);
      });
  }, []);

  // Filtrer les images en fonction du tag sélectionné
  const handleFilter = (tag) => {
    if (tag === 'all') {
      setFilteredImages(images); // Afficher toutes les images si "all" est sélectionné
    } else {
      const filtered = images.filter(image => image.tags.includes(tag));
      setFilteredImages(filtered);
    }
  };

  return (
    <div className="gallery-page-container">
      <div className="gallery-buttons">
        {/* Boutons de filtrage basés sur les tags */}
        <button onClick={() => handleFilter('all')}>Toutes</button>
        {tags.map(tag => (
          <button key={tag} onClick={() => handleFilter(tag)}>{tag}</button>
        ))}
      </div>
      <div className="gallery-images">
        {/* Afficher les images filtrées */}
        {filteredImages.map(image => (
          <div key={image._id}>
            <img className="gallery-image" src={image.imageUrl} alt={image.title} />
            <p>{image.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
