import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Users, Calendar, MapPin, QrCode, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvent } from '../api/events';

export default function Dashboard() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '', location: '', date: '', description: ''
  });

  const mutation = useMutation({
    mutationFn: (newEvent: any) => createEvent(newEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setIsModalOpen(false);
      setFormData({ title: '', location: '', date: '', description: '' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title: formData.title,
      location: formData.location,
      description: formData.description,
      start_date: new Date(formData.date).toISOString(),
      end_date: new Date(formData.date).toISOString(),
      // В реальном проекте здесь должен быть ID авторизованного админа
      created_by: '00000000-0000-0000-0000-000000000000', 
    });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Create Event Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', width: '100%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', padding: '0.5rem' }}><X size={20} /></button>
            <h2 style={{ marginBottom: '1.5rem' }}>Create New Event</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input required type="text" placeholder="Event Title (e.g. Troodos Cup)" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <input required type="text" placeholder="Location (e.g. Troodos Square)" className="input-field" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              <input required type="date" className="input-field" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              <textarea required placeholder="Description of the terrain and event..." className="input-field" rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              <button type="submit" className="btn-primary" disabled={mutation.isPending} style={{ marginTop: '1rem' }}>
                {mutation.isPending ? 'Saving...' : 'Save Event'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>{t('dashboard')}</h2>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary"><Plus size={18} /> New Event</button>
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
