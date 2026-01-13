// Import library dan komponen
// Komponen utama App
  // Cek autentikasi
  // Cegah back ke login/detail
  // Loading
import Login from './shared/Login';
import './App.css';
import Footer from './shared/components/Footer';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <Login />
      </div>
      <Footer />
    </div>
  );
}

export default App;
