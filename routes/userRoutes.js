/**
 * Fichier : userRoutes.js
 * Description : Route pour les utilisateurs de l'application SLM Coiffure...by Anais.G
 * Auteur : BOUDIER Christophe
 */

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');
const verifyToken = require('../middlewares/authMiddleware.js');

// Création d'un utilisateur
router.post('/create', UserController.signup);

// Connexion de l'utilisateur
router.post('/login', UserController.login);

// Récupération des informations de l'utilisateur
router.get('/read/:userId', UserController.getUserProfile);

// Récupération des informations de tous les utilisateurs
router.get('/read', UserController.getAllUserProfiles);

// Mise à jour des informations de l'utilisateur
router.put('/update/:userId', verifyToken, UserController.updateUserProfile);

// Suppression des informations de l'utilisateur
router.delete('/delete/:userId', verifyToken, UserController.deleteUserProfile);

// Déconnexion de l'utilisateur
router.get('/logout', verifyToken, UserController.logout);

// Réinitialisation du mot de passe
router.post('/reset-password', verifyToken, UserController.resetPassword);

module.exports = router;
