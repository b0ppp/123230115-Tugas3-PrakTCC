// ============================================================
// PENTING: Ganti URL di bawah dengan URL backend yang sudah di-deploy
// Contoh App Engine : https://notes-backend-dot-PROJECT_ID.appspot.com/api/notes
// Contoh Cloud Run  : https://notes-backend-XXXXX-uc.a.run.app/api/notes
// ============================================================
const API_URL = 'https://notes-backend-514828886605.us-central1.run.app/api/notes';

// Ambil elemen HTML
const noteForm    = document.getElementById('noteForm');
const notesList   = document.getElementById('notesList');
const noteIdInput = document.getElementById('noteId');
const judulInput  = document.getElementById('judul');
const isiInput    = document.getElementById('isi');
const btnSubmit   = document.getElementById('btnSubmit');
const btnCancel   = document.getElementById('btnCancel');

// Fungsi Mengambil Data dari Backend (GET)
async function fetchNotes() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    // proteksi agar tidak error jika data kosong
    const notes = Array.isArray(result) ? result : (result.data || []);

    notesList.innerHTML = '';

    if (notes.length === 0) {
      notesList.innerHTML = '<p class="empty-msg">Belum ada catatan. Tambahkan sekarang!</p>';
      return;
    }

    notes.forEach(note => {
      const date   = new Date(note.tanggal_dibuat).toLocaleString('id-ID');
      const noteEl = document.createElement('div');
      noteEl.className = 'note-card';
      noteEl.innerHTML = `
        <h3>${note.judul}</h3>
        <p>${note.isi}</p>
        <small>Dibuat pada: ${date}</small>
        <div class="note-actions">
          <button class="btn-edit"
            onclick="editNote(${note.id}, '${note.judul.replace(/'/g, "\\'")}', '${note.isi.replace(/\n/g, '\\n').replace(/'/g, "\\'")}')">
            ✏️ Edit
          </button>
          <button class="btn-delete" onclick="deleteNote(${note.id})">🗑️ Hapus</button>
        </div>
      `;
      notesList.appendChild(noteEl);
    });
  } catch (error) {
    notesList.innerHTML = `<p class="error-msg">❌ Gagal memuat catatan. Pastikan backend sudah berjalan.<br><small>${error.message}</small></p>`;
    console.error('Gagal mengambil data:', error);
  }
}

// Fungsi Tambah atau Update Data (POST / PUT)
noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id    = noteIdInput.value;
  const judul = judulInput.value;
  const isi   = isiInput.value;

  const method = id ? 'PUT' : 'POST';
  const url    = id ? `${API_URL}/${id}` : API_URL;

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ judul, isi }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    resetForm();
    fetchNotes();
  } catch (error) {
    alert('Gagal menyimpan: ' + error.message);
    console.error('Gagal menyimpan data:', error);
  }
});

// Fungsi Menghapus Data (DELETE)
async function deleteNote(id) {
  if (!confirm('Yakin ingin menghapus catatan ini?')) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchNotes();
  } catch (error) {
    alert('Gagal menghapus: ' + error.message);
    console.error('Gagal menghapus data:', error);
  }
}

// Fungsi Mode Edit
function editNote(id, judul, isi) {
  noteIdInput.value     = id;
  judulInput.value      = judul;
  isiInput.value        = isi.replace(/\\n/g, '\n');
  btnSubmit.textContent = 'Update Catatan';
  btnCancel.style.display = 'inline-block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Reset Form ke Mode Tambah
function resetForm() {
  noteForm.reset();
  noteIdInput.value       = '';
  btnSubmit.textContent   = 'Tambah Catatan';
  btnCancel.style.display = 'none';
}

// Load saat halaman dibuka
fetchNotes();
