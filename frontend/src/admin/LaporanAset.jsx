// Import library dan komponen
// Custom hook set judul
// Map status
// Fungsi untuk class status
// Custom hook ambil data laporan
// Komponen utama

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/components/Navbar';
import './LaporanAset.css';

// Dummy data
const DUMMY_REPORTS = [
  { id: 'LAP001', email_pelapor: 'admin1@telkom.co.id', unit: 'Jakarta Barat', status: 'Pending' },
  { id: 'LAP002', email_pelapor: 'admin2@telkom.co.id', unit: 'Jakarta Timur', status: 'Dalam Proses' },
  { id: 'LAP003', email_pelapor: 'admin3@telkom.co.id', unit: 'Jakarta Selatan', status: 'Selesai' },
];

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



function LaporanAset() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  // Filter dummy data
  const filteredItems = statusFilter
    ? DUMMY_REPORTS.filter(item => (statusMap[item.status] || item.status) === statusFilter)
    : DUMMY_REPORTS;

  // Filter by search term
  const finalItems = searchTerm
    ? filteredItems.filter(item =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.email_pelapor && item.email_pelapor.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.unit && item.unit.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : filteredItems;

  useEffect(() => {
    document.title = 'Daftar Laporan Aset | Admin';
    return () => { document.title = 'Aplikasi Pengaduan Aset'; };
  }, []);

  return (
    <div className="laporan-page">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <div className="laporan-wrap">
        {finalItems.length === 0 ? (
          <div style={{textAlign:'center', color:'#666', padding:'20px'}}>Tidak ada laporan.</div>
        ) : (
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
                {finalItems.map((item, index) => (
                  <tr key={item.id} style={{cursor: 'default'}}>
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
