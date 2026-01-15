import './App.css';
import Footer from './shared/components/Footer';
import LaporanAset from './admin/LaporanAset';
import Login from './shared/Login';

import TeknisiLaporanAset from './Teknisi/TeknisiLaporanAset.jsx';
import TeknisiLaporanDetail from './teknisi/TeknisiLaporanDetail.jsx';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/laporan-aset" element={<LaporanAset />} />

            <Route path="/TeknisiLaporanAset" element={<TeknisiLaporanAset />} />
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
