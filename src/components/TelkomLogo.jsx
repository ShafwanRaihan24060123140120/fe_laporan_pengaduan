import telkomLogo from '../assets/telkom-logo.jpg';
import './TelkomLogo.css';

function TelkomLogo({ size = 'medium' }) {
  return (
    <img 
      src={telkomLogo} 
      alt="Telkom Indonesia Logo" 
      className={`telkom-logo telkom-logo-${size}`}
    />
  );
}

export default TelkomLogo;
