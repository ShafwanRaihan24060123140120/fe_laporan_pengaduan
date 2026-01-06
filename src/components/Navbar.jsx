import { Link, useNavigate } from 'react-router-dom';
import TelkomLogo from './TelkomLogo';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Yakin ingin logout?')) {
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <TelkomLogo size="small" />
        <Link to="/dashboard" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/laporan-aset" className="nav-link">Laporan Aset</Link>
      </div>
      <div className="navbar-right">
        <button onClick={handleLogout} className="logout-btn">
          Logout Admin 1
        </button>
        <span className="time">11:24</span>
      </div>
    </nav>
  );
}

export default Navbar;
