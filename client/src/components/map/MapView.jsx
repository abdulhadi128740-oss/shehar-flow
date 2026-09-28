import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createIcon = (color) =>
  L.divIcon({
    className: '',
    html: `<div style="
      background-color: ${color};
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 4px rgba(0,0,0,0.5);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

const getColor = (severity) => {
  switch (severity) {
    case 'critical':
      return '#ef4444';
    case 'high':
      return '#f97316';
    case 'medium':
      return '#eab308';
    default:
      return '#3b82f6';
  }
};

const MapView = ({ hotspots, center = [24.8607, 67.0011] }) => {
  return (
    <div className="h-[450px] w-full rounded-xl overflow-hidden border border-slate-700">
      <MapContainer
        key={`${center[0]}-${center[1]}`}
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hotspots.map((spot) => (
          <Marker
            key={spot._id}
            position={[spot.coordinates.lat, spot.coordinates.lng]}
            icon={createIcon(getColor(spot.severity))}
          >
            <Popup>
              <div>
                <strong>{spot.title}</strong>
                <br />
                <span>{spot.location}</span>
                <br />
                <span className="capitalize">
                  {spot.type.replace('_', ' ')} • {spot.severity}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;