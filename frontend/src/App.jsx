 import './App.css';
import Footer from './shared/components/Footer';
import LaporanAset from './admin/LaporanAset';
import DetailLaporan from './admin/DetailLaporan';
import TeknisiLaporanAset from './Teknisi/TeknisiLaporanAset';
import TeknisiLaporanDetail from './Teknisi/TeknisiLaporanDetail';
import Login from './shared/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import { useEffect } from 'react';
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
            <Route path="/laporan-aset" element={<LaporanAset />} />
            <Route path="/laporan/:id" element={<DetailLaporan />} />
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
