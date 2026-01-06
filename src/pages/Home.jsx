import { Link } from 'react-router-dom';
import TelkomLogo from '../components/TelkomLogo';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-section">
          <TelkomLogo size="medium" />
          <div className="telkom-text">
            <h1>Telkom</h1>
            <p>Indonesia</p>
          </div>
        </div>
        <div className="header-right">
          <span className="time">11:24</span>
        </div>
      </header>

      <div className="home-content">
        <div className="title-section">
          <h2>PT. Telkom Witel Jakarta Centrum</h2>
          <h3>LAYANAN</h3>
          <h1 className="main-title">PENGADUAN ASET</h1>
        </div>

        <div className="tagline">
          <TelkomLogo size="xlarge" />
          <div className="telkom-brand">
            <h2>Telkom</h2>
            <p>Indonesia</p>
          </div>
          <p className="slogan">the world in your hand</p>
        </div>

        <Link to="/login" className="btn btn-primary">
          Masuk ke Sistem
        </Link>
      </div>
    </div>
  );
}

export default Home;
