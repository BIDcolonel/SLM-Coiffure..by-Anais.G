const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Création d'un utilisateur
router.post('/create', UserController.signup);

// Connexion de l'utilisateur
router.post('/login', UserController.login);

// Middleware d'authentification pour les routes suivantes
//router.use(authMiddleware.extractUserId);

// Récupération des informations de l'utilisateur
router.get('/read/:userId', UserController.getUserProfile);

// Récupération des informations de tous les utilisateurs
router.get('/read', UserController.getAllUserProfiles);

// Mise à jour des informations de l'utilisateur
router.put('/update/:userId', UserController.updateUserProfile);

// Suppression des informations de l'utilisateur
router.delete('/delete/:userId', UserController.deleteUserProfile);

// Déconnexion de l'utilisateur
router.get('/logout', UserController.logout);

// Réinitialisation du mot de passe
router.post('/reset-password', UserController.resetPassword);

module.exports = router;
