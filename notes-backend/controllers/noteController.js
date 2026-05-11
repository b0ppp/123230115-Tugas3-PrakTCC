// controllers/noteController.js
const NoteModel = require('../models/noteModel');

const getAllNotes = async (req, res) => {
    try {
        const notes = await NoteModel.getAllNotes();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createNote = async (req, res) => {
    try {
        const { judul, isi } = req.body;
        const result = await NoteModel.createNote(judul, isi);

        res.status(201).json({
            message: 'Catatan ditambahkan!',
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, isi } = req.body;

        await NoteModel.updateNote(id, judul, isi);

        res.json({
            message: 'Catatan diupdate!'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        await NoteModel.deleteNote(id);

        res.json({
            message: 'Catatan dihapus!'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
};