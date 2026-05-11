# Tugas 3 – Deployment Notes App ke App Engine & Cloud Run

## ⚠️ LANGKAH WAJIB SEBELUM DEPLOY

### 1. Ganti semua placeholder `NIM`
Cari teks `NIM` di file-file berikut dan ganti dengan NIM kamu:

| File | Yang diganti |
|------|-------------|
| `notes-backend/.env` | `notes_NIM` → `notes_123456789` (2x) |
| `notes-backend/app.yaml` | `notes_NIM` → `notes_123456789` (2x) |
| `notes_db_tugas3.sql` | `notes_NIM` → `notes_123456789` (3x) |

### 2. Buat Database & Tabel di phpMyAdmin
1. Buka https://phpmyadmin.cc/ → login dengan admin / #password#
2. Klik tab **SQL**
3. Copy-paste isi `notes_db_tugas3.sql` (setelah NIM diganti)
4. Klik **Go**

---

## 🚀 SKENARIO 1 – Backend di App Engine, Frontend di Cloud Run

### A. Deploy Backend ke App Engine

```bash
# Masuk ke folder backend
cd notes-backend

# Install dependencies
npm install

# Pastikan app.yaml sudah diisi NIM yang benar
# Deploy ke App Engine
gcloud app deploy app.yaml --project=PROJECT_ID

# Catat URL yang muncul setelah deploy, contoh:
# https://notes-backend-dot-PROJECT_ID.appspot.com
```

### B. Update script.js Frontend dengan URL Backend
Buka `notes-frontend/script.js`, ubah baris pertama:
```js
const API_URL = 'https://notes-backend-dot-PROJECT_ID.appspot.com/api/notes';
```

### C. Deploy Frontend ke Cloud Run

```bash
cd notes-frontend

# Build Docker image
gcloud builds submit --tag gcr.io/PROJECT_ID/notes-frontend

# Deploy ke Cloud Run
gcloud run deploy notes-frontend \
  --image gcr.io/PROJECT_ID/notes-frontend \
  --platform managed \
  --region asia-southeast2 \
  --allow-unauthenticated \
  --port 8080 \
  --project PROJECT_ID

# Catat URL Cloud Run yang muncul, contoh:
# https://notes-frontend-XXXXX-et.a.run.app
```

### D. Update FRONTEND_URL di app.yaml Backend
Buka `notes-backend/app.yaml`, ubah:
```yaml
FRONTEND_URL: "https://notes-frontend-XXXXX-et.a.run.app"
```
Lalu re-deploy backend: `gcloud app deploy app.yaml --project=PROJECT_ID`

---

## 🚀 SKENARIO 2 – Backend di Cloud Run, Frontend di App Engine

### A. Deploy Backend ke Cloud Run

```bash
cd notes-backend

# Build dan push Docker image
gcloud builds submit --tag gcr.io/PROJECT_ID/notes-backend

# Deploy ke Cloud Run dengan variabel lingkungan
gcloud run deploy notes-backend \
  --image gcr.io/PROJECT_ID/notes-backend \
  --platform managed \
  --region asia-southeast2 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars DB_HOST=34.172.113.167,DB_USER=admin,DB_PASSWORD="#password#",DB_NAME=notes_NIM,DB_TABLE=notes_NIM \
  --project PROJECT_ID

# Catat URL, contoh:
# https://notes-backend-XXXXX-et.a.run.app
```

### B. Update script.js Frontend dengan URL Backend
Buka `notes-frontend/script.js`, ubah baris pertama:
```js
const API_URL = 'https://notes-backend-XXXXX-et.a.run.app/api/notes';
```

### C. Deploy Frontend ke App Engine

```bash
cd notes-frontend

# Install dependencies
npm install

# Deploy ke App Engine sebagai service terpisah
gcloud app deploy app.yaml \
  --project=PROJECT_ID

# Catat URL, contoh:
# https://notes-frontend-dot-PROJECT_ID.appspot.com
```

### D. Update FRONTEND_URL di Cloud Run Backend
```bash
gcloud run services update notes-backend \
  --update-env-vars FRONTEND_URL=https://notes-frontend-dot-PROJECT_ID.appspot.com \
  --region asia-southeast2 \
  --project PROJECT_ID
```

---

## 🧪 Pengujian Endpoint Backend (Postman / REST Client)

```
GET    https://BACKEND_URL/api/notes
POST   https://BACKEND_URL/api/notes        Body: {"judul":"Test","isi":"Isi test"}
PUT    https://BACKEND_URL/api/notes/1      Body: {"judul":"Edit","isi":"Isi baru"}
DELETE https://BACKEND_URL/api/notes/1
```

---

## 📁 Struktur File

```
TUGAS_3_CODE/
├── notes-backend/
│   ├── config/database.js
│   ├── controllers/noteController.js
│   ├── models/noteModel.js
│   ├── routes/noteRoutes.js
│   ├── index.js
│   ├── package.json
│   ├── .env              ← untuk lokal / Cloud Run env
│   ├── app.yaml          ← untuk App Engine
│   ├── Dockerfile        ← untuk Cloud Run
│   └── .gcloudignore
├── notes-frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js         ← UPDATE API_URL setelah deploy backend!
│   ├── server.js         ← static file server untuk App Engine
│   ├── package.json
│   ├── app.yaml          ← untuk App Engine
│   ├── Dockerfile        ← untuk Cloud Run (nginx)
│   ├── nginx.conf
│   └── .gcloudignore
└── notes_db_tugas3.sql   ← jalankan di phpMyAdmin setelah ganti NIM
```
