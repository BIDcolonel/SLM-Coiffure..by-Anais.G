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
        setFilteredImages(response.data.data); // Afficher toutes les images par défaut
        // Récupérer tous les tags disponibles
        const allTags = response.data.data.flatMap(image => image.tags);
        setTags([...new Set(allTags)]); // Supprimer les doublons de tags
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
    <div>
      <h2>Galerie Photo</h2>
      <div>
        {/* Boutons de filtrage basés sur les tags */}
        <button onClick={() => handleFilter('all')}>Toutes</button>
        {tags.map(tag => (
          <button key={tag} onClick={() => handleFilter(tag)}>{tag}</button>
        ))}
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              {/* Afficher les images filtrées dans un tableau */}
              {filteredImages.map(image => (
                <td key={image._id} style={{ textAlign: 'center', padding: '10px' }}>
                  <img className="gallery-image" src={image.imageUrl} alt={image.title} />
                  <p style={{ marginTop: '10px' }}>{image.title}</p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
</div>
    </div>
  );
};

export default GalleryPage;
