import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Map } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <Map size={80} color="var(--primary-color)" />
      </div>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {t('welcome')}
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        {t('subtitle')}
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/login" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
          {t('register')} <ArrowRight size={20} />
        </Link>
        <a href="#events" className="btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
          {t('events')}
        </a>
      </div>
    </div>
  );
}
