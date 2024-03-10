const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const Review = require('../models/reviewModel');

// Test de création d'un avis
test('Créer un nouvel avis', async () => {
  const reviewData = {
    clientFirstName: 'John',
    clientLastName: 'Doe',
    rating: 4,
    comment: 'Great service!',
  };

  const review = new Review(reviewData);
  await review.save();

  const response = await request(app)
    .post('/api/reviews/create')
    .send(reviewData);

  expect(response.statusCode).toBe(201);
  expect(response.body.success).toBe(true);
});

// Test de lecture d'un avis
test('Lire un avis', async () => {
  const reviewData = {
    clientFirstName: 'Jane',
    clientLastName: 'Doe',
    rating: 5,
    comment: 'Excellent experience!',
  };

  const review = new Review(reviewData);
  await review.save();

  const foundReview = await Review.findOne({ clientFirstName: reviewData.clientFirstName });
  expect(foundReview).toEqual(expect.objectContaining(reviewData));
});

// Test de mise à jour d'un avis
test('Mettre à jour un avis', async () => {
  const reviewData = {
    clientFirstName: 'Alice',
    clientLastName: 'Smith',
    rating: 3,
    comment: 'Could be better.',
  };

  const review = new Review(reviewData);
  await review.save();

  const updatedData = { rating: 4, comment: 'Improved service.' };

  const updatedReview = await Review.findByIdAndUpdate(review._id, updatedData, { new: true });

  expect(updatedReview).toBeDefined();
  expect(updatedReview.rating).toBe(updatedData.rating);
  expect(updatedReview.comment).toBe(updatedData.comment);
});

// Test de suppression d'un avis
test('Supprimer un avis', async () => {
  const reviewData = {
    clientFirstName: 'Bob',
    clientLastName: 'Johnson',
    rating: 2,
    comment: 'Not satisfied.',
  };

  const review = new Review(reviewData);
  await review.save();

  await Review.findByIdAndDelete(review._id);

  const deletedReview = await Review.findById(review._id);
  expect(deletedReview).toBeNull();
});
