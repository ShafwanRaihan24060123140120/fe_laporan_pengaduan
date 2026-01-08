import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

function Navbar({ searchTerm, onSearchChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLaporan = location.pathname.startsWith('/laporan-aset') || location.pathname.startsWith('/laporan/');
  const isVerif = location.pathname.startsWith('/verifikasi');

  return (
    <nav className="navbar">
      <div className="navbar-search">
        <input 
          type="text" 
          placeholder="Cari berdasarkan Email Pelapor, Jenis, Status" 
          value={searchTerm || ''}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        />
        <span className="search-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </span>
      </div>
      
      <div className="navbar-right">
        <button onClick={handleLogout} className="logout-link">Logout</button>
        <div className="profile-dropdown">
          <button 
            className="admin-pill" 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <span className="profile-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-4.41 0-8 1.79-8 4v2h16v-2c0-2.21-3.59-4-8-4z"/>
              </svg>
            </span>
            <span className="admin-name">Admin 1</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: '4px'}}>
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
          {showProfileMenu && (
            <div className="profile-menu">
              <Link 
                to="/verifikasi" 
                className={`menu-item ${isVerif ? 'active' : ''}`}
                onClick={() => setShowProfileMenu(false)}
              >
                Manajemen User
              </Link>
              <Link 
                to="/laporan-aset" 
                className={`menu-item ${isLaporan ? 'active' : ''}`}
                onClick={() => setShowProfileMenu(false)}
              >
                Laporan Aset
              </Link>
            </div>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={showLogoutModal}
        title="Logout"
        message="Yakin ingin keluar dari sistem?"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </nav>
  );
}

export default Navbar;
