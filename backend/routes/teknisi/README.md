# Teknisi Routes

Folder ini disiapkan untuk memisahkan route Teknisi.
Saat ini semua route masih didefinisikan di `backend/index.js`.

Rencana pemindahan (tidak mengubah perilaku):
- Auth/login (shared)
- Reports (GET/DELETE/PUT status) — admin/teknisi

Pemindahan akan dilakukan bertahap supaya aplikasi tidak rusak saat refactor.