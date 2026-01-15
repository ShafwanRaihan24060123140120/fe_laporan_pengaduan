// Import library
// Map status
// Fungsi untuk class status
// Custom hook ambil data laporan
// Komponen utama
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/components/Navbar';
import './TeknisiLaporanAset.css';

const statusMap = {
  'Pending': 'To-Do',
  'Dalam Proses': 'Processed',
  'Selesai': 'Done',
  'To-Do': 'To-Do',
  'In Progress': 'Processed',
  'Processed': 'Processed',
  'Done': 'Done'
};

const getStatusClass = (status) => {
  if (status === 'Selesai' || status === 'Done') return 'status-done';
  if (status === 'Dalam Proses' || status === 'In Progress' || status === 'Processed') return 'status-in-progress';
  return 'status-to-do';
};

// ===== Tambahan: dummy data untuk tanpa backend =====
const DUMMY_REPORTS = [
  { id: 'LP-001', email_pelapor: 'user1@email.com', unit: 'Witel Jakarta Centrum', status: 'Pending' },
  { id: 'LP-002', email_pelapor: 'user2@email.com', unit: 'Witel Jakarta Timur', status: 'Dalam Proses' },
  { id: 'LP-003', email_pelapor: 'user3@email.com', unit: 'Witel Jakarta Barat', status: 'Selesai' },
];

function useTeknisiReports(searchTerm, navigate) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');

        // ===== Perubahan kecil: kalau belum ada backend/token, tampilkan dummy =====
        // Kalau Anda ingin tetap paksa login, hapus blok ini.
        if (!token) {
          const data = searchTerm
            ? DUMMY_REPORTS.filter((x) => {
                const q = searchTerm.toLowerCase();
                return (
                  String(x.id).toLowerCase().includes(q) ||
                  String(x.email_pelapor || '').toLowerCase().includes(q) ||
                  String(x.unit || '').toLowerCase().includes(q) ||
                  String(x.status || '').toLowerCase().includes(q)
                );
              })
            : DUMMY_REPORTS;

          setItems(data);
          setError('');
          return;
        }

        const url = searchTerm
          ? `/api/teknisi/reports?search=${encodeURIComponent(searchTerm)}`
          : '/api/teknisi/reports';

        const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });

        if (res.status === 401) {
          localStorage.clear();
          navigate('/login');
          return;
        }
        if (res.status === 429) {
          setError('Terlalu banyak permintaan. Coba lagi sebentar lagi.');
          return;
        }
        if (!res.ok) {
          const t = await res.text();

          // ===== Perubahan kecil: kalau server error, fallback dummy supaya page tampil =====
          const data = searchTerm
            ? DUMMY_REPORTS.filter((x) => {
                const q = searchTerm.toLowerCase();
                return (
                  String(x.id).toLowerCase().includes(q) ||
                  String(x.email_pelapor || '').toLowerCase().includes(q) ||
                  String(x.unit || '').toLowerCase().includes(q) ||
                  String(x.status || '').toLowerCase().includes(q)
                );
              })
            : DUMMY_REPORTS;

          setItems(data);
          setError(`Gagal memuat data (${res.status}). ${t}`.trim());
          return;
        }

        const data = await res.json();
        if (Array.isArray(data)) setItems(data);
        else setError('Format data tidak valid');
      } catch (_) {
        // ===== Perubahan kecil: kalau fetch gagal (backend tidak ada), fallback dummy =====
        const data = searchTerm
          ? DUMMY_REPORTS.filter((x) => {
              const q = searchTerm.toLowerCase();
              return (
                String(x.id).toLowerCase().includes(q) ||
                String(x.email_pelapor || '').toLowerCase().includes(q) ||
                String(x.unit || '').toLowerCase().includes(q) ||
                String(x.status || '').toLowerCase().includes(q)
              );
            })
          : DUMMY_REPORTS;

        setItems(data);
        setError('Gagal memuat data dari server');
      } finally {
        setLoading(false);
      }
    })();
  }, [searchTerm, navigate]);

  return { items, loading, error };
}

import { useEffect as useEffectTitle } from 'react';

function useSetTeknisiListTitle() {
  useEffectTitle(() => {
    document.title = 'Laporan Aset | Teknisi';
    return () => { document.title = 'Aplikasi Pengaduan Aset'; };
  }, []);
}

export default function TeknisiLaporanAset() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { items, loading, error } = useTeknisiReports(searchTerm, navigate);
  useSetTeknisiListTitle();

  // Filter items berdasarkan status jika statusFilter dipilih
  const filteredItems = statusFilter
    ? items.filter(item => (statusMap[item.status] || item.status) === statusFilter)
    : items;

  return (
    <div className="laporan-page">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <div className="laporan-wrap">
        {loading && <div style={{ textAlign:'center', color:'#666', padding:'20px' }}>Memuat data...</div>}
        {!loading && error && <div style={{ textAlign:'center', color:'#b00000', padding:'20px' }}>{error}</div>}

        {!loading && !error && filteredItems.length === 0 && (
          <div style={{ textAlign:'center', color:'#666', padding:'20px' }}>Tidak ada laporan.</div>
        )}

        {!loading && !error && filteredItems.length > 0 && (
          <div className="laporan-table-container">
            <table className="laporan-table">
              <thead>
                <tr>
                  <th>Kode Laporan</th>
                  <th>Nama Pelapor</th>
                  <th>Lokasi Unit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} style={{ cursor:'pointer' }} onClick={() => navigate(`/teknisi/laporan/${item.id}`)}>
                    <td><span className="table-code">{item.id}</span></td>
                    <td>{item.email_pelapor || '-'}</td>
                    <td>{item.unit || '-'}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(item.status)}`}>
                        {statusMap[item.status] || item.status || 'To-Do'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
