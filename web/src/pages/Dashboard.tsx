import { useTranslation } from 'react-i18next';
import { Plus, Users, Calendar, MapPin, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>{t('dashboard')}</h2>
        <button className="btn-primary"><Plus size={18} /> New Event</button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <Users size={32} color="#8b5cf6" style={{ marginBottom: '1rem' }} />
          <h3>Total Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>1,248</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <Calendar size={32} color="#3b82f6" style={{ marginBottom: '1rem' }} />
          <h3>Upcoming Events</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>3</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <MapPin size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
          <h3>Locations</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>12</p>
        </div>
      </div>
      
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
    </div>
  );
}
