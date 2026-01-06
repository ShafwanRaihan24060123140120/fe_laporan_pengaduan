import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Dashboard.css';

function Dashboard() {
  const stats = [
    { title: 'Total Pengguna', value: '12 Pengguna', icon: '👤' },
    { title: 'Total laporan', value: '10 Laporan', icon: '📄' },
    { title: 'Dalam Proses', value: '3 Diproses', icon: '⏳' },
    { title: 'Selesai', value: '1 Selesai', icon: '✓' },
    { title: 'Dibatalkan', value: '0 Batal', icon: '✗' }
  ];

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Berikut adalah dashboard anda</h2>
          <p>Admin 1</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="telkom-brands">
          <div className="brand-logo">Telkom Indonesia</div>
          <div className="brand-logo">TELKOMSEL</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
