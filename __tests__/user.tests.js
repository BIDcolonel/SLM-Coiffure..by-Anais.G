const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const User = require('../models/userModel');
const { generateJWTToken } = require('../middlewares/jwtUtils');

// Test de création d'un utilisateur
test('Créer un nouvel utilisateur', async () => {
  const userData = {
    email: 'test@example.com',
    password: 'Password123!?',
    firstName: 'John',
    lastName: 'Doe',
    address: '121 Main St',
    phone: '0685259562',
    gender: 'Homme',
    age: 30,
    role: 'client'
  };

  const user = new User(userData);
  await user.save();

  const response = await request(app)
    .post('/api/users/create')
    .send(userData);


  expect(response.statusCode).toBe(201);
  expect(response.body.success).toBe(true);
});

// Test de lecture d'un utilisateur
test('Lire un utilisateur', async () => {
  const userData = {
    email: 'test2@example.com',
    password: 'Password123!?',
    firstName: 'Johnn',
    lastName: 'Doee',
    address: '122 Main St',
    phone: '0684253785',
    gender: 'Homme',
    age: 30,
    role: 'client'
  };

  const user = new User(userData);
  await user.save();

  const foundUser = await User.findOne({ email: userData.email });
  expect(foundUser).toEqual(expect.objectContaining(userData));
});

// Test de mise à jour d'un utilisateur
test('Mettre à jour un utilisateur', async () => {
  const userData = {
    email: 'test3@example.com',
    password: 'Password123!?',
    firstName: 'Johnny',
    lastName: 'Doees',
    address: '123 Main St',
    phone: '0635951425',
    gender: 'Homme',
    age: 30,
    role: 'client'
  };

  const user = new User(userData);
  await user.save();

  const updatedData = { firstName: 'Jane', age: 35 };

  const updatedUser = await User.findByIdAndUpdate(user._id, updatedData, { new: true });

  expect(updatedUser).toBeDefined();
  expect(updatedUser.firstName).toBe(updatedData.firstName);
  expect(updatedUser.age).toBe(updatedData.age);
});

// Test de suppression d'un utilisateur
test('Supprimer un utilisateur', async () => {
  const userData = {
    email: 'test4@example.com',
    password: 'Password123!?',
    firstName: 'Johnnnye',
    lastName: 'Doeese',
    address: '124 Main St',
    phone: '0649751586',
    gender: 'Homme',
    age: 30,
    role: 'client'
  };

  const user = new User(userData);
  await user.save();

  await User.findByIdAndDelete(user._id);

  const deletedUser = await User.findById(user._id);
  expect(deletedUser).toBeNull();
});
