// Review Support Service - Main application fileconst express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4006;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'review-support-service' });
});

app.get('/api/reviews', (req, res) => {
  res.json({ message: 'Review support service endpoint' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Review Support Service running on port ${PORT}`);
});

module.exports = app;