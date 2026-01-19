import './App.css';
import Footer from './shared/components/Footer';
import LaporanAset from './admin/LaporanAset';
import Login from './shared/Login';

import TeknisiLaporanAset from './Teknisi/TeknisiLaporanAset.jsx';
import TeknisiLaporanDetail from './Teknisi/TeknisiLaporanDetail.jsx';

import RequireRole from './shared/components/RequireRole.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* contoh admin (kalau belum ada guard admin, sementara biarkan) */}
            <Route path="/laporan-aset" element={<LaporanAset />} />
            <Route path="/" element={<Navigate to="/teknisi/laporan-aset" replace />} />

            <Route path="/teknisi/laporan-aset" element={<TeknisiLaporanAset />} />
            <Route path="/teknisi/laporan/:id" element={<TeknisiLaporanDetail />} />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
