 import './App.css';
import Footer from './shared/components/Footer';
import LaporanAset from './admin/LaporanAset';
import DetailLaporan from './admin/DetailLaporan';
import TeknisiLaporanAset from './Teknisi/TeknisiLaporanAset';
import TeknisiLaporanDetail from './Teknisi/TeknisiLaporanDetail';
import Login from './shared/Login';
<<<<<<< HEAD

import TeknisiLaporanAset from './Teknisi/TeknisiLaporanAset.jsx';
import TeknisiLaporanDetail from './Teknisi/TeknisiLaporanDetail.jsx';

import RequireRole from './shared/components/RequireRole.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

=======
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import { useEffect } from 'react';
>>>>>>> 226a1d62d860cace2d6271a34206d070726b4547
function App() {
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      window.history.go(1);
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
<<<<<<< HEAD

            {/* contoh admin (kalau belum ada guard admin, sementara biarkan) */}
            <Route path="/laporan-aset" element={<LaporanAset />} />
            <Route path="/" element={<Navigate to="/teknisi/laporan-aset" replace />} />

=======
            <Route path="/laporan-aset" element={<LaporanAset />} />
            <Route path="/laporan/:id" element={<DetailLaporan />} />
>>>>>>> 226a1d62d860cace2d6271a34206d070726b4547
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
