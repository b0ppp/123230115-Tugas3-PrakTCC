// models/noteModel.js
const db = require('../config/database');
require('dotenv').config();

// Nama tabel
const TABLE = process.env.DB_TABLE || 'notes';

const NoteModel = {
  getAllNotes: async () => {
    const [rows] = await db.query(
      `SELECT * FROM \`${TABLE}\` ORDER BY tanggal_dibuat DESC`
    );
    return rows;
  },

  getNoteById: async (id) => {
    const [rows] = await db.query(
      `SELECT * FROM \`${TABLE}\` WHERE id = ?`,
      [id]
    );
    return rows[0];
  },

  createNote: async (judul, isi) => {
    const [result] = await db.query(
      `INSERT INTO \`${TABLE}\` (judul, isi) VALUES (?, ?)`,
      [judul, isi]
    );
    return result;
  },

  updateNote: async (id, judul, isi) => {
    const [result] = await db.query(
      `UPDATE \`${TABLE}\` SET judul = ?, isi = ? WHERE id = ?`,
      [judul, isi, id]
    );
    return result;
  },

  deleteNote: async (id) => {
    const [result] = await db.query(
      `DELETE FROM \`${TABLE}\` WHERE id = ?`,
      [id]
    );
    return result;
  },
};

module.exports = NoteModel;
