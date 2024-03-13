/**
 * Fichier : prestations.tests.js
 * Description : Test des routes pour les prestations de l'application SLM Coiffure...by Anais.G
 * Auteur : BOUDIER Christophe
 */

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index'); // Votre fichier d'entrée (index.js)
const Prestation = require('../models/prestationsModel');

// Test de création d'une prestation
test('Créer une nouvelle prestation', async () => {
  const prestationData = {
    name: 'Coupe Homme',
    price: 20,
    clientTypes: ['Homme'],
    hairLength: 'Court',
    isActive: true
  };

  const response = await request(app)
    .post('/api/prestations/create')
    .send(prestationData);

  expect(response.statusCode).toBe(201);
  expect(response.body.success).toBe(true);
});

// Test de lecture d'une prestation
test('Lire une prestation', async () => {
  const prestationData = {
    name: 'Coupe Femme',
    price: 30,
    clientTypes: ['Femme'],
    hairLength: 'Mi-long',
    isActive: true
  };

  const prestation = new Prestation(prestationData);
  await prestation.save();

  const foundPrestation = await Prestation.findOne({ name: prestationData.name });
  expect(foundPrestation).toEqual(expect.objectContaining(prestationData));
});

// Test de mise à jour d'une prestation
test('Mettre à jour une prestation', async () => {
  const prestationData = {
    name: 'Coupe Enfant',
    price: 15,
    clientTypes: ['Enfant'],
    hairLength: 'Court',
    isActive: true
  };

  const prestation = new Prestation(prestationData);
  await prestation.save();

  const updatedData = { price: 18 };

  const updatedPrestation = await Prestation.findByIdAndUpdate(prestation._id, updatedData, { new: true });

  expect(updatedPrestation).toBeDefined();
  expect(updatedPrestation.price).toBe(updatedData.price);
});

// Test de suppression d'une prestation
test('Supprimer une prestation', async () => {
  const prestationData = {
    name: 'Coupe Longue',
    price: 40,
    clientTypes: ['Femme'],
    hairLength: 'Long',
    isActive: true
  };

  const prestation = new Prestation(prestationData);
  await prestation.save();

  await Prestation.findByIdAndDelete(prestation._id);

  const deletedPrestation = await Prestation.findById(prestation._id);
  expect(deletedPrestation).toBeNull();
});
