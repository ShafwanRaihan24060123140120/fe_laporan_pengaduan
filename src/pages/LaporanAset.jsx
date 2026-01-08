import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LaporanAset.css';

import { useEffect, useState } from 'react';

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

function useReports(searchTerm) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const url = searchTerm ? `/api/reports?search=${encodeURIComponent(searchTerm)}` : '/api/reports';
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data)) setItems(data);
        else setError('Format data tidak valid');
      } catch (e) {
        console.error(e);
        setError('Gagal memuat data dari server');
      }
      setLoading(false);
    })();
  }, [searchTerm]);
  return { items, loading, error };
}

function LaporanAset() {
  const [searchTerm, setSearchTerm] = useState('');
  const { items, loading, error } = useReports(searchTerm);
  
  return (
    <div className="laporan-page">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="laporan-wrap">
        {loading && <div style={{textAlign:'center', color:'#666', padding:'20px'}}>Memuat data…</div>}
        {!loading && error && (
          <div style={{textAlign:'center', color:'#b00000', padding:'20px'}}>
            {error}. Pastikan backend berjalan (npm start di folder server).
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div style={{textAlign:'center', color:'#666', padding:'20px'}}>Tidak ada laporan.</div>
        )}

        {!loading && !error && items.length > 0 && (
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
                {items.map((item, index) => (
                  <tr key={item.id} onClick={() => window.location.href = `/laporan/${item.id}`} style={{cursor: 'pointer'}}>
                    <td>
                      <span className="table-code">{item.id}</span>
                    </td>
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

export default LaporanAset;
