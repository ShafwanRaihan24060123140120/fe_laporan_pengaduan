# Struktur Project - Telkom Asset Management

## 📁 Struktur Folder

```
project_pengaduan_aset/
├── frontend/                    # Frontend Application (React + Vite)
│   ├── src/
│   │   ├── admin/              # Halaman Admin
│   │   │   ├── LaporanAset.jsx        # List laporan
│   │   │   ├── DetailLaporan.jsx      # Detail laporan
│   │   │   ├── Verifikasi.jsx         # Verifikasi user
│   │   │   └── VerifikasiDetail.jsx   # Detail verifikasi
│   │   ├── teknisi/            # Halaman Teknisi
│   │   │   ├── TeknisiLaporanAset.jsx
│   │   │   └── TeknisiLaporanDetail.jsx
│   │   ├── shared/             # Komponen Bersama
│   │   │   ├── components/    # UI Components (Navbar, Footer, dll)
│   │   │   ├── assets/        # Images, icons
│   │   │   └── Login.jsx      # Halaman login
│   │   ├── App.jsx            # Root component
│   │   └── main.jsx           # Entry point
│   ├── public/                # Static assets
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                    # Backend API (Express)
│   ├── routes/                # API Routes (future: admin.js, teknisi.js)
│   ├── middleware/            # Auth, Rate Limiter
│   │   ├── auth.js
│   │   └── rateLimiter.js
│   ├── data/                  # SQLite database
│   │   └── app.db
│   ├── db.js                  # Database functions
│   ├── index.js               # Main server file
│   ├── .env                   # Environment variables
│   └── package.json
│
└── README.md

```

## 🚀 Cara Menjalankan

### Backend
```bash
cd backend
npm install
npm start
```
Server: http://localhost:4000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App: http://localhost:5173

## 👥 Default Credentials

**Admin:**
- Username: `admin`
- Password: `admin123`

**Teknisi:**
- Username: `teknisi`
- Password: `TelkomTeknisi2026!`

## 📝 Notes

- Frontend menggunakan **React + Vite**
- Backend menggunakan **Express + SQLite**
- Authentication menggunakan **JWT**
- Security: Helmet, CORS, Rate Limiting
