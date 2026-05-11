  // index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const noteRoutes = require('./routes/noteRoutes');

const app = express();

// CORS – izinkan frontend URL (isi FRONTEND_URL di .env setelah deploy)
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5500']
  : true; // izinkan semua jika belum diset

app.use(cors({
  origin: 'https://angelic-bee-477417-t8.et.r.appspot.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Health check (dibutuhkan App Engine & Cloud Run)
app.get('/', (req, res) => {
  res.send('Notes backend berjalan');
});

// Routes
app.use('/api', noteRoutes);

// PORT 8080 wajib untuk App Engine & Cloud Run
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server berjalan di port ${PORT}`);
});
