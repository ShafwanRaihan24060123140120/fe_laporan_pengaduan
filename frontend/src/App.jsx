import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './shared/Login';
import LaporanAset from './admin/LaporanAset';
import DetailLaporan from './admin/DetailLaporan';
import './App.css';
import Footer from './shared/components/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ color: '#666' }}>Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route 
          path="/laporan-aset" 
          element={isAuthenticated ? <LaporanAset /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/laporan/:id" 
          element={isAuthenticated ? <DetailLaporan /> : <Navigate to="/login" />} 
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
