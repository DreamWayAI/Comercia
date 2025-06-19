// Vercel serverless function entry point
const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Proposals API placeholder
app.get('/api/proposals', (req, res) => {
  res.json([]);
});

app.post('/api/proposals', (req, res) => {
  // For now, just return success
  const proposal = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  res.status(201).json(proposal);
});

// Export for Vercel
module.exports = app;