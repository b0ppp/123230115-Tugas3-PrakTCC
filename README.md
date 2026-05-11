# 📝 Notes App - Simpan Ide dan Catatanmu Kapan Saja!

Selamat datang di **Notes App**!

Pernahkah Anda tiba-tiba mendapat ide cemerlang, daftar tugas yang harus diingat, atau sekadar ingin menulis catatan singkat, tapi bingung mau mencatat di mana? Notes App hadir untuk membantu Anda menyimpan semua hal penting tersebut dengan cepat, rapi, dan mudah diakses.

Aplikasi ini dirancang khusus dengan antarmuka yang sangat bersih, bebas iklan, dan mudah digunakan oleh siapa saja tanpa perlu proses pendaftaran yang rumit.

---

## ✨ Fitur Utama

* **✏️ Catat Cepat:** Masukkan judul dan isi catatan Anda, lalu simpan dalam hitungan detik.
* **📖 Tampilan Rapi:** Catatan ditampilkan dalam bentuk kartu (grid) yang memudahkan pencarian informasi.
* **📝 Fitur Edit & Hapus:** Perbarui informasi catatan atau hapus tugas yang sudah selesai dengan satu klik.
* **☁️ Penyimpanan Awan (Cloud):** Berkat infrastruktur Google Cloud, catatan Anda tersimpan aman dan dapat diakses dari perangkat mana pun.
* **⚡ Performa Responsif:** Menggunakan teknologi modern untuk memastikan setiap perubahan terjadi seketika tanpa *loading* yang lama.

---

## 🚀 Cara Menggunakan Aplikasi

1. **Membuat Catatan:** Isi kolom "Judul" dan "Isi Catatan" di bagian atas, lalu klik **Tambah Catatan**.
2. **Mengubah Catatan:** Klik tombol **Edit** pada kartu catatan, perbarui isinya, dan simpan.
3. **Menghapus Catatan:** Klik tombol **Hapus** (merah) untuk menghapus catatan secara permanen.

---

## 🌐 Coba Aplikasinya Sekarang!

Aplikasi ini sudah beroperasi secara *online* dan dapat langsung Anda coba melalui tautan berikut:

👉 **[Buka Notes App di Sini](https://angelic-bee-477417-t8.et.r.appspot.com)**

---

## 📁 Struktur Proyek

Untuk keperluan teknis, berikut adalah gambaran susunan file (*source code*) yang membangun aplikasi ini:

```text
TUGAS_3_CODE/
├── notes-backend/          # Layanan API (Mesin utama penyimpan data)
│   ├── config/             
│   │   └── database.js     # Pengaturan koneksi ke sistem database
│   ├── controllers/        
│   │   └── noteController.js # Logika untuk memproses catatan (Tambah, Edit, Hapus)
│   ├── models/             
│   │   └── noteModel.js    # Cetak biru struktur data di database
│   ├── routes/             
│   │   └── noteRoutes.js   # Jalur akses komunikasi sistem (Endpoint API)
│   ├── .env                
│   ├── .env.example        
│   ├── .gcloudignore       
│   ├── api.rest            
│   ├── cloudbuild.yaml     # Perintah otomatisasi update (CI/CD) ke Cloud Run
│   ├── Dockerfile          # Instruksi pembuatan wadah sistem (Container)
│   ├── index.js            
│   └── package.json        
├── notes-frontend/         # Antarmuka Pengguna (Tampilan web interaktif)
│   ├── .gcloudignore       
│   ├── app.yaml            # Konfigurasi peluncuran web di Google App Engine
│   ├── cloudbuild.yaml     # Perintah otomatisasi update tampilan (CI/CD)
│   ├── Dockerfile          # Instruksi server web alternatif (opsional)
│   ├── index.html          
│   ├── nginx.conf          
│   ├── package.json        
│   ├── script.js           
│   ├── server.js           
│   └── style.css           
└── README.md               