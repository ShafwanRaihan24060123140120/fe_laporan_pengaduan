import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './shared/Login';
import LaporanAset from './admin/LaporanAset';
import DetailLaporan from './admin/DetailLaporan';
import TeknisiLaporanAset from './teknisi/TeknisiLaporanAset';
import TeknisiLaporanDetail from './teknisi/TeknisiLaporanDetail';
import './App.css';
import Footer from './shared/components/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
    setLoading(false);
  }, []);

  // Prevent browser back to login page and detail pages only
  useEffect(() => {
    const handlePopState = (event) => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const currentPath = window.location.pathname;
      
      // Prevent going back to login if authenticated
      if (token && currentPath === '/login') {
        const redirectPath = role === 'teknisi' ? '/teknisi/laporan-aset' : '/laporan-aset';
        window.history.pushState(null, '', redirectPath);
        window.location.href = redirectPath;
        return;
      }
      
      // Prevent going back from detail pages
      if (currentPath.match(/\/laporan\/.+/)) {
        window.history.pushState(null, '', currentPath);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
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
        {/* Redirect root ke dashboard sesuai role jika sudah login */}
        <Route 
          path="/" 
          element={
            isAuthenticated 
              ? (userRole === 'teknisi' 
                  ? <Navigate to="/teknisi/laporan-aset" replace /> 
                  : <Navigate to="/laporan-aset" replace />)
              : <Navigate to="/login" replace />
          } 
        />
        
        {/* Redirect login jika sudah authenticated */}
        <Route 
          path="/login" 
          element={
            isAuthenticated 
              ? (userRole === 'teknisi' 
                  ? <Navigate to="/teknisi/laporan-aset" replace /> 
                  : <Navigate to="/laporan-aset" replace />)
              : <Login setAuth={setIsAuthenticated} setRole={setUserRole} />
          } 
        />
        
        <Route 
          path="/laporan-aset" 
          element={isAuthenticated ? <LaporanAset /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/laporan/:id" 
          element={isAuthenticated ? <DetailLaporan /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/teknisi/laporan-aset" 
          element={isAuthenticated ? <TeknisiLaporanAset /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/teknisi/laporan/:id" 
          element={isAuthenticated ? <TeknisiLaporanDetail /> : <Navigate to="/login" />} 
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
