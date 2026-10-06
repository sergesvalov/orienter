import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import StatCards from '../components/dashboard/StatCards';
import RecentRegistrations from '../components/dashboard/RecentRegistrations';
import CreateEventModal from '../components/dashboard/CreateEventModal';

export default function Dashboard() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <CreateEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>{t('dashboard')}</h2>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary"><Plus size={18} /> New Event</button>
      </div>
      
      <StatCards />
      <RecentRegistrations />
    </div>
  );
}
