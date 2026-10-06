import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Map } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import EventCard from '../components/EventCard';

export default function Home() {
  const { t } = useTranslation();
  const { data: events, isLoading, error } = useEvents();

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
           {[1, 2, 3].map(i => (
             <div key={i} className="glass-panel" style={{ height: '220px', width: '300px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', background: 'var(--surface-color)', animationDelay: `${i * 0.2}s` }}></div>
           ))}
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
            events?.map(event => <EventCard key={event.id} event={event} />)
          )}
        </div>
      )}
    </div>
  );
}
