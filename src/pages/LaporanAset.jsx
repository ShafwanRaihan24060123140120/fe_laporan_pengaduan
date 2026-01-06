import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LaporanAset.css';

function LaporanAset() {
  const reports = Array.from({ length: 10 }, (_, i) => ({
    id: `SSGS${String(i + 1).padStart(2, '0')}`,
    status: i === 0 ? 'Selesai' : i < 4 ? 'Dalam Proses' : 'Pending'
  }));

  return (
    <div className="laporan-container">
      <Navbar />
      
      <div className="laporan-content">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Cari berdasarkan Nama Pelapor, Jenis, Status"
          />
        </div>

        <div className="reports-grid">
          {reports.map((report) => (
            <Link 
              key={report.id} 
              to={`/laporan/${report.id}`} 
              className="report-card"
            >
              <div className="report-id">{report.id}</div>
              <div className={`report-status status-${report.status.toLowerCase().replace(' ', '-')}`}>
                {report.status}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LaporanAset;
