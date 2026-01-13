import { useState, useEffect } from 'react';
import './Login.css';
import TelkomLogo from './components/TelkomLogo';

// Komponen Login
function Login() {
    // Set judul
    useEffect(() => {
      document.title = 'Login | Sistem Laporan Pengaduan';
      return () => { document.title = 'Sistem Laporan Pengaduan'; };
    }, []);

    // State form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    // Render halaman
    return (
      <div className="login-page">
        {/* Header */}
        <header className="login-header">
          <div className="login-header-brand">
            <TelkomLogo size="small" />
            <span className="login-header-text">PT. Telkom Witel Jakarta Centrum</span>
          </div>
          <p className="login-header-address">
            Jl. Yos Sudarso No.23-24, RT.16/RW.6 14320 Tanjung Priok Daerah Khusus Ibukota Jakarta
          </p>
        </header>

        {/* Layout utama */}
        <div className="login-main">
          {/* Hero */}
          <div className="login-hero">
            <h1 className="login-hero-title">
              LAPORAN<br />
              PENGADUAN
            </h1>
            <p className="login-hero-subtitle">
              Selamat datang di sistem laporan pengaduan PT. Telkom Witel Jakarta Centrum. Silakan masuk untuk melanjutkan.
            </p>
          </div>

          {/* Form login */}
          <div className="login-panel">
            <div className="login-card">
              <h2 className="login-card-title">Login</h2>
              <form
                className="login-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setError('Belum ada backend.');
                }}
              >

                {/* Username */}
                <label className="login-label" htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  className="login-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                />

                {/* Password */}
                <label className="login-label" htmlFor="password">Password:</label>
                <input
                  id="password"
                  type="password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                />

                {/* Error */}
                {error && <p className="login-error">{error}</p>}
                {/* Tombol login */}
                <button type="submit" className="login-submit" disabled={loading}>
                  {loading ? 'Memproses…' : 'Masuk'}
                </button>
              </form> 
            </div>
          </div>
        </div>

      </div>
    );
}

// Export Login
export default Login;
