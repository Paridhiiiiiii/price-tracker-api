const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB().then(() => {
  require('./cron/pricePoller');
  console.log('[Server] Price polling cron job started');
});

const app = express();
app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, try again later' }
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/alerts', require('./routes/alertRoutes'));
app.use('/api/history', require('./routes/priceHistoryRoutes'));

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Price Tracker API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});