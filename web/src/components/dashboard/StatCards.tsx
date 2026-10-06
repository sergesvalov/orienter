import { Users, Calendar, MapPin } from 'lucide-react';

export default function StatCards() {
  return (
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
  );
}
