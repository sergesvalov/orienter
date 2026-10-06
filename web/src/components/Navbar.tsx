import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Compass, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  return (
    <nav className="glass-panel" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 100 }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
        <Compass color="var(--primary-color)" size={28} />
        <span>CyprusCup</span>
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" className="nav-link">{t('home')}</Link>
        <Link to="/dashboard" className="nav-link">{t('dashboard')}</Link>
        
        <div style={{ position: 'relative' }}>
          <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }} onClick={() => setLangOpen(!langOpen)}>
            <Globe size={20} />
          </button>
          {langOpen && (
            <div className="glass-panel" style={{ position: 'absolute', right: 0, top: '120%', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button className="btn-secondary" style={{ border: 'none', textAlign: 'left' }} onClick={() => changeLanguage('ru')}>RU</button>
              <button className="btn-secondary" style={{ border: 'none', textAlign: 'left' }} onClick={() => changeLanguage('en')}>EN</button>
              <button className="btn-secondary" style={{ border: 'none', textAlign: 'left' }} onClick={() => changeLanguage('el')}>EL</button>
            </div>
          )}
        </div>
        
        <Link to="/login" className="btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
          {t('login')}
        </Link>
      </div>
    </nav>
  );
}
