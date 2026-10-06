import { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateEvent } from '../../hooks/useEvents';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateEventModal({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState({ title: '', location: '', date: '', description: '' });
  const mutation = useCreateEvent();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title: formData.title,
      location: formData.location,
      description: formData.description,
      start_date: new Date(formData.date).toISOString(),
      end_date: new Date(formData.date).toISOString(),
      created_by: '00000000-0000-0000-0000-000000000000', 
    }, {
      onSuccess: () => {
        setFormData({ title: '', location: '', date: '', description: '' });
        onClose();
      }
    });
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', width: '100%', maxWidth: '500px', position: 'relative' }}>
        <button onClick={onClose} className="btn-secondary" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', padding: '0.5rem' }}><X size={20} /></button>
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
  );
}
