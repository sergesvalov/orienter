import { QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function RecentRegistrations() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Registrations</h3>
        <p style={{ color: 'var(--text-secondary)' }}>You are registered for: <strong style={{color: 'white'}}>Troodos O-Festival</strong></p>
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
          <p style={{marginBottom: '0.5rem'}}>Category: <strong style={{color: 'white'}}>M21E</strong></p>
          <p>Status: <span style={{ color: '#10b981', fontWeight: 'bold' }}>Confirmed</span></p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <QrCode size={24} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ marginBottom: '1rem' }}>Your Check-in QR</h3>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '12px' }}>
          <QRCodeSVG value="cypruscup:reg:uuid-1234-5678" size={160} />
        </div>
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Show this code at the registration desk to get your number and SI-Card.
        </p>
      </div>
    </div>
  );
}
