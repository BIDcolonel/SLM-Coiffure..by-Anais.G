const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const ContactInfo = require('../models/contactInfoModel');

// Test de création des informations de contact
test('Créer de nouvelles informations de contact', async () => {
  const contactInfoData = {
    address: '123 Rue Principale',
    phone: '0685259562',
    email: 'test@example.com',
    facebook: 'https://www.facebook.com/exemple'
  };

  const response = await request(app)
    .post('/api/contactinfo/create')
    .send(contactInfoData);

  expect(response.statusCode).toBe(201);
  expect(response.body.success).toBe(true);
});

// Test de récupération des informations de contact
test('Lire les informations de contact', async () => {
  const contactInfoData = {
    address: '123 Rue Principale',
    phone: '0685259562',
    email: 'test@example.com',
    facebook: 'https://www.facebook.com/exemple'
  };

  const contactInfo = new ContactInfo(contactInfoData);
  await contactInfo.save();

  const response = await request(app)
    .get('/api/contactinfo/read');

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.data.length).toBeGreaterThan(0);
});

// Test de mise à jour des informations de contact
test('Mettre à jour les informations de contact', async () => {
  const contactInfoData = {
    address: '123 Rue Principale',
    phone: '0685259562',
    email: 'test@example.com',
    facebook: 'https://www.facebook.com/exemple'
  };

  const contactInfo = new ContactInfo(contactInfoData);
  await contactInfo.save();

  const updatedData = { address: '456 Nouvelle Rue' };

  const response = await request(app)
    .put(`/api/contactinfo/update/${contactInfo._id}`)
    .send(updatedData);

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.data.address).toBe(updatedData.address);
});

// Test de suppression des informations de contact
test('Supprimer les informations de contact', async () => {
  const contactInfoData = {
    address: '123 Rue Principale',
    phone: '0685259562',
    email: 'test@example.com',
    facebook: 'https://www.facebook.com/exemple'
  };

  const contactInfo = new ContactInfo(contactInfoData);
  await contactInfo.save();

  const response = await request(app)
    .delete(`/api/contactinfo/delete/${contactInfo._id}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);

  const deletedContactInfo = await ContactInfo.findById(contactInfo._id);
  expect(deletedContactInfo).toBeNull();
});
