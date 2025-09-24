const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Route principale - retourne un message simple
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Hello from my CI/CD Pipeline!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Route de santé - essentielle pour le monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'mon-app-cobaye',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

// Route additionnelle pour simuler une fonctionnalité
app.get('/api/users', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'Alice', email: 'alice@email.com' },
      { id: 2, name: 'Bob', email: 'bob@email.com' }
    ],
    count: 2
  });
});

// Route pour tester les erreurs (utile pour les tests)
app.get('/api/error', (req, res) => {
  res.status(500).json({ error: 'This is a simulated error' });
});

// Démarrer le serveur
const server = app.listen(port, () => {
  console.log(`✅ Application démarrée sur le port ${port}`);
  console.log(`📍 URL: http://localhost:${port}`);
});

// Export pour les tests
module.exports = app;