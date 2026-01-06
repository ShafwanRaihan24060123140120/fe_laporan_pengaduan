import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import telkomLogo from '../assets/telkom-logo.png'; // atau .jpg
import './Login.css';

function Login({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setAuth(true);
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-page">
      {/* Header */}
      <div className="login-page-header">
        <div className="logo-header">
          <img src={telkomLogo} alt="Telkom Logo" className="logo-img" />
          <span>PT. Telkom Witel Jakarta Centrum</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="login-content-wrapper">
        {/* Left Section */}
        <div className="login-left-section">
          <h1 className="main-heading">
            LAYANAN<br />
            PENGADUAN ASET
          </h1>
          
          <div className="brand-section">
            <img src={telkomLogo} alt="Telkom Logo" className="logo-big-img" />
            <div className="brand-info">
              <h2>Telkom</h2>
              <p>Indonesia</p>
            </div>
          </div>
          <p className="tagline">the world in your hand</p>
        </div>

        {/* Right Section - Login Form */}
        <div className="login-right-section">
          <div className="login-card">
            <h2>LOGIN</h2>
            
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username:"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              
              <input
                type="password"
                placeholder="Password:"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <p className="register-info">
                Belum ada akun? <a href="#">registrasi disini</a>
              </p>

              <button type="submit">LOGIN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
