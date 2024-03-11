/**
 * Fichier : index.js
 * Description : Point d'entrée de l'application SLM Coiffure...by Anaïs.G
 * Auteur : BOUDIER Christophe
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Créer une instance de l'application Express
const app = express();

// Parser les requêtes HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Activer CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware pour définir les en-têtes de politique de permissions
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=()');
  next();
});

// Configuration de la connexion à MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB :', error);
  });

  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = process.env.MONGODB_URI;
  // Creation d'un nouveau client
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Vous vous êtes connecté avec succès à MongoDB !");
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);

// Importation des routes
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const prestationsRoutes = require('./routes/prestationsRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const contactInfoRoutes = require('./routes/contactInfoRoutes');

// Définition des routes
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/prestations', prestationsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contactinfo', contactInfoRoutes);

// Export app
module.exports = app;

// Port du serveur
const PORT = process.env.PORT || 8080;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur à l'écoute sur le port ${PORT}`);
});
