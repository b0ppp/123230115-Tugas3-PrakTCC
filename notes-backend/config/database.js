// config/database.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  host:     process.env.DB_HOST     || '34.172.113.167',
  user:     process.env.DB_USER     || 'admin',
  password: process.env.DB_PASSWORD || '#password#',
  database: process.env.DB_NAME     || 'notes_NIM',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = db;
