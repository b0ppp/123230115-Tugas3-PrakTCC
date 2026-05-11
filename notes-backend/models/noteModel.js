// models/noteModel.js
const db = require('../config/database');
require('dotenv').config();

// Nama tabel sesuai format Tugas 3: notes_NIM  (contoh: notes_123456789)
const TABLE = process.env.DB_TABLE || 'notes_123230115';

const NoteModel = {
  getAllNotes: async () => {
    const [rows] = await db.query(
      `SELECT * FROM \`${TABLE}\` ORDER BY tanggal_dibuat DESC`
    );
    return rows;
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
