import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Map, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../api/events';

export default function Home() {
  const { t } = useTranslation();
  
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents
  });

  return (
    <div className="animate-fade-in" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <Map size={80} color="var(--primary-color)" />
      </div>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {t('welcome')}
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        {t('subtitle')}
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
        <Link to="/login" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
          {t('register')} <ArrowRight size={20} />
        </Link>
      </div>

      <h2 id="events" style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'left', color: 'white' }}>{t('events')}</h2>
      
      {isLoading ? (
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
           <div className="glass-panel" style={{ height: '220px', width: '300px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', background: 'var(--surface-color)' }}></div>
           <div className="glass-panel" style={{ height: '220px', width: '300px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', background: 'var(--surface-color)', animationDelay: '0.2s' }}></div>
           <div className="glass-panel" style={{ height: '220px', width: '300px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', background: 'var(--surface-color)', animationDelay: '0.4s' }}></div>
        </div>
      ) : error ? (
        <div className="glass-panel" style={{ color: '#ef4444', padding: '2rem' }}>
          Error loading events: {(error as Error).message}. Check your Supabase URL/Key in the .env file.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
          {events?.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No upcoming events currently scheduled.</p>
          ) : (
            events?.map(event => (
              <div key={event.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
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
            ))
          )}
        </div>
      )}
    </div>
  );
}
