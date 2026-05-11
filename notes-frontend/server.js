// server.js – Serve frontend sebagai static files di App Engine / Cloud Run
const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 8080;

// Serve semua file statis dari folder ini
app.use(express.static(path.join(__dirname)));

// Fallback ke index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend berjalan di port ${PORT}`);
});
