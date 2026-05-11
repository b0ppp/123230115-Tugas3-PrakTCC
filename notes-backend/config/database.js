// config/database.js
const mysql = require('mysql2/promise');
require('dotenv').config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const db = mysql.createPool({
  host:     process.env.DB_HOST     || '34.172.113.167',
  user:     process.env.DB_USER     || 'admin',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME     || 'notes_123230115',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = db;
