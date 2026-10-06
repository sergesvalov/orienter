import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react';
import type { Database } from '../types/supabase';

type Event = Database['public']['Tables']['events']['Row'];

export default function EventCard({ event }: { event: Event }) {
  return (
    <div 
      className="glass-panel" 
      style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.2s', cursor: 'pointer' }} 
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} 
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <h3 style={{ fontSize: '1.25rem', color: 'white' }}>{event.title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
        <CalendarIcon size={16} />
        <span>{new Date(event.start_date).toLocaleDateString()}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
        <MapPin size={16} />
        <span>{event.location}</span>
      </div>
      <Link to={`/events/${event.id}`} className="btn-secondary" style={{ marginTop: 'auto', textAlign: 'center' }}>Details</Link>
    </div>
  );
}
