// Import library dan komponen
// Komponen utama App
  // Cek autentikasi
  // Cegah back ke login/detail
  // Loading


import './App.css';
import Footer from './shared/components/Footer';
import LaporanAset from './admin/LaporanAset';
import DetailLaporan from './admin/DetailLaporan';
import Login from './shared/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/laporan-aset" element={<LaporanAset />} />
            <Route path="/laporan/:id" element={<DetailLaporan />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
