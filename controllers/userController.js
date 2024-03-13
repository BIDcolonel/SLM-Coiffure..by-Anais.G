/**
 * Fichier : userController.js
 * Description : Contrôleur pour les utilisateurs de l'application SLM Coiffure...by Anais.G
 * Auteur : BOUDIER Christophe
 */

require('dotenv').config();

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/userModel.js');
const crypto = require('crypto');
const jwtUtils = require('../middlewares/jwtUtils');

// Configuration de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Contrôleur pour la création d'un nouvel utilisateur
exports.signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, address, phone, gender, age, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      phone,
      gender,
      age,
      role
    });

    // Envoi de l'e-mail
    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Bienvenue sur notre plateforme',
      html: `
        <p>Bonjour ${firstName},</p>
        <p>Votre compte a été créé avec succès!</p>
        <p>Merci de rejoindre notre plateforme.</p>
      `
    });

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: "Impossible de créer l'utilisateur" });
  }
};

// Contrôleur pour récupérer le profil utilisateur
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Contrôleur pour récupérer les profils de tous les utilisateurs
exports.getAllUserProfiles = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, error: 'No users found' });
    }
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching user profiles:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Contrôleur pour mettre à jour le profil utilisateur
exports.updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, address, phone, gender, age, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
      firstName,
      lastName,
      address,
      phone,
      gender,
      age,
      role // Ajouter le champ "role" à la mise à jour
    }, { new: true });
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Contrôleur pour supprimer le profil utilisateur
exports.deleteUserProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ success: true, message: 'Profil utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Contrôleur pour la connexion de l'utilisateur
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Recherche de l'utilisateur par son email
    const user = await User.findOne({ email });

    // Vérification de l'utilisateur
    if (!user) {
      return res.status(404).json({ success: false, error: 'Adresse e-mail non trouvée' });
    }

    // Vérification du mot de passe
    if (password !== user.password) {
      return res.status(401).json({ success: false, error: 'Mot de passe incorrect' });
    }

    // Génération du token JWT
    const token = jwtUtils.generateJWTToken(email, password);

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, error: "Erreur lors de la connexion" });
  }
};

// Contrôleur pour la déconnexion de l'utilisateur
exports.logout = async (req, res) => {
  try {
    res.clearCookie('token');

    // Réponse indiquant que la déconnexion a réussi
    res.status(200).json({ success: true, message: 'Déconnexion réussie' });
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse avec un code d'erreur approprié
    res.status(500).json({ success: false, error: "Erreur lors de la déconnexion" });
  }
};

// Contrôleur pour la réinitialisation du mot de passe
exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Recherche de l'utilisateur par son email
    const user = await User.findOne({ email });

    // Vérification si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ success: false, error: "Adresse e-mail non trouvée" });
    }

    // Génération du token de réinitialisation de mot de passe
    const resetToken = crypto.randomBytes(20).toString('hex');
    // Définition de la date d'expiration du token (1 heure)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 heure
    await user.save();

    // Envoi de l'e-mail de réinitialisation du mot de passe
    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Réinitialisation de mot de passe',
      html: `
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Veuillez cliquer sur le lien suivant pour définir un nouveau mot de passe :</p>
        <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">Réinitialiser le mot de passe</a>
        <p>Le lien expirera dans 1 heure.</p>
      `
    });

    res.status(200).json({ success: true, message: 'Instructions de réinitialisation du mot de passe envoyées par e-mail' });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ success: false, error: "Erreur lors de la réinitialisation du mot de passe" });
  }
};

// Exporter les fonctions du contrôleur
module.exports = exports;
