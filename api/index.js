// Vercel serverless function entry point
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// In-memory storage for proposals
let proposals = [];
let currentId = 1;

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all proposals
app.get('/api/proposals', (req, res) => {
  res.json(proposals);
});

// Create new proposal
app.post('/api/proposals', (req, res) => {
  try {
    const proposal = {
      id: currentId++,
      ...req.body,
      createdAt: new Date().toISOString()
    };
    proposals.push(proposal);
    res.status(201).json(proposal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get single proposal
app.get('/api/proposals/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const proposal = proposals.find(p => p.id === id);
  
  if (!proposal) {
    return res.status(404).json({ error: 'Proposal not found' });
  }
  
  res.json(proposal);
});

// Export for Vercel
module.exports = app;