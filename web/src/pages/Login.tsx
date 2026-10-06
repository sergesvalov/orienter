import { useTranslation } from 'react-i18next';
import { Mail, Key, LayoutDashboard } from 'lucide-react';

export default function Login() {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <LayoutDashboard size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
          <h2>{t('login')}</h2>
        </div>
        
        <div>
          <div style={{ position: 'relative' }}>
            <Mail size={20} color="var(--text-secondary)" style={{ position: 'absolute', top: '14px', left: '14px' }} />
            <input type="email" placeholder={t('email')} className="input-field" style={{ paddingLeft: '40px' }} />
          </div>
        </div>
        
        <div>
          <div style={{ position: 'relative' }}>
            <Key size={20} color="var(--text-secondary)" style={{ position: 'absolute', top: '14px', left: '14px' }} />
            <input type="password" placeholder={t('password')} className="input-field" style={{ paddingLeft: '40px' }} />
          </div>
        </div>
        
        <button className="btn-primary" style={{ width: '100%' }}>
          {t('sign_in')}
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }}></div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }}></div>
        </div>
        
        <button className="btn-secondary" style={{ width: '100%', background: 'white', color: 'black' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style={{ width: '20px' }} />
          {t('sign_in_google')}
        </button>
      </div>
    </div>
  );
}
