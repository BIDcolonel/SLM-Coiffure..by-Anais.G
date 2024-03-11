/**
 * Fichier : contactInfoController.js
 * Description : Contrôleur pour les informations de contact de l'application SLM Coiffure...by Anais.G
 * Auteur : BOUDIER Christophe
 */

const ContactInfo = require('../models/contactInfoModel');
const nodemailer = require('nodemailer');

// Contrôleur pour créer de nouvelles informations de contact
exports.createContactInfo = async (req, res) => {
  try {
    const { address, phone, email, facebook } = req.body;
    const newContactInfo = await ContactInfo.create({ address, phone, email, facebook });
    res.status(201).json({ success: true, data: newContactInfo });
  } catch (error) {
    console.error("Error creating contact info:", error);
    res.status(500).json({ success: false, error: "Impossible de créer les informations de contact" });
  }
};

// Contrôleur pour récupérer les informations de contact
exports.getContactInfo = async (req, res) => {
  try {
    const contactInfo = await ContactInfo.find();
    res.status(200).json({ success: true, data: contactInfo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Contrôleur pour mettre à jour les informations de contact
exports.updateContactInfo = async (req, res) => {
  try {
    const { address, phone, email, facebook } = req.body;
    const updatedContactInfo = await ContactInfo.findByIdAndUpdate(req.params.contactId, {
      address,
      phone,
      email,
      facebook
    }, { new: true });
    res.status(200).json({ success: true, data: updatedContactInfo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Contrôleur pour supprimer les informations de contact
exports.deleteContactInfo = async (req, res) => {
  try {
    await ContactInfo.findByIdAndDelete(req.params.contactId);
    res.status(200).json({ success: true, message: 'Informations de contact supprimées avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Contrôleur pour envoyer un email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: process.env.DESTINATION_EMAIL_ADDRESS,
      subject: 'Nouveau message de votre site web',
      html: `
        <p>Nom: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message:</p>
        <p>${message}</p>
      `
    });

    res.status(200).json({ success: true, message: 'Message envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'envoi du message' });
  }
};

// Exporter les fonctions du contrôleur
module.exports = exports;
