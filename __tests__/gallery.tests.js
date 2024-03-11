const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const GalleryPhoto = require('../models/galleryModel');

// Test de création d'une image dans la galerie
test('Créer une nouvelle image dans la galerie', async () => {
  const imageInfo = {
    title: 'Nouvelle image',
    imageUrl: 'https://example.com/image.jpg',
    description: 'Description de l\'image',
    tags: ['nature', 'paysage']
  };

  const response = await request(app)
    .post('/api/gallery/create')
    .send(imageInfo);

  expect(response.statusCode).toBe(201);
  expect(response.body.success).toBe(true);
});

// Test de lecture des images de la galerie
test('Lire les images de la galerie', async () => {
  const response = await request(app)
    .get('/api/gallery/read');

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.data).toBeDefined();
  expect(response.body.data.length).toBeGreaterThan(0);
});

// Test de mise à jour d'une image de la galerie
test('Mettre à jour une image de la galerie', async () => {
  const imageInfo = {
    title: 'Nouveau titre',
    description: 'Nouvelle description',
    tags: ['nouveau', 'tag']
  };

  const images = await GalleryPhoto.find();
  const imageId = images[0]._id;

  const response = await request(app)
    .put(`/api/gallery/update/${imageId}`)
    .send(imageInfo);

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);

  const updatedImage = await GalleryPhoto.findById(imageId);
  expect(updatedImage.title).toBe(imageInfo.title);
  expect(updatedImage.description).toBe(imageInfo.description);
  expect(updatedImage.tags).toEqual(expect.arrayContaining(imageInfo.tags));
});

// Test de suppression d'une image de la galerie
test('Supprimer une image de la galerie', async () => {
  const images = await GalleryPhoto.find();
  const imageId = images[0]._id;

  const response = await request(app)
    .delete(`/api/gallery/delete/${imageId}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);

  const deletedImage = await GalleryPhoto.findById(imageId);
  expect(deletedImage).toBeNull();
});
