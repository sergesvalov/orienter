import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function EventDetails() {
  const { id } = useParams();
  // coordinates for Troodos Mountains, Cyprus
  const position: [number, number] = [34.9234, 32.8833]; 

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Troodos O-Festival {id && `(Event: ${id.slice(0,4)})`}</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Stage 1 - Middle Distance</p>
        <p style={{ marginTop: '1rem' }}>Experience the challenging pine forests of the Troodos mountains at 1700m elevation. Expect technical rock features and steep slopes.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
          <div style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--surface-border)' }}>
            <h3>Event Map & Embargoed Area</h3>
          </div>
          <div style={{ height: '500px', width: '100%' }}>
            <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  Event Arena & Parking
                </Popup>
              </Marker>
              <Circle center={[34.9250, 32.8800]} pathOptions={{ color: 'red', fillColor: '#f03', fillOpacity: 0.3 }} radius={800}>
                 <Popup>Embargoed Area (Карантин)</Popup>
              </Circle>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
