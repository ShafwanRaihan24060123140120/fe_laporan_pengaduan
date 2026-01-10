# Admin Routes

Folder ini disiapkan untuk memisahkan route Admin.
Saat ini semua route masih didefinisikan di `backend/index.js`.

Rencana pemindahan (tidak mengubah perilaku):
- Auth/login (shared)
- Reports (GET/DELETE/PUT status) — shared admin/teknisi
- Users management (GET/POST/DELETE) — khusus admin
- Dashboard summary — admin

Pemindahan bertahap agar tidak mematahkan aplikasi yang sudah berjalan.