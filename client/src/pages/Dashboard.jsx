import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { io } from 'socket.io-client';
import {
  getHotspots,
  getAlerts,
  deleteHotspot,
  updateHotspot,
  getActivities,
} from '../api/dashboard';
import MapView from '../components/map/MapView';
import Navbar from '../components/common/Navbar';
import CreateHotspotForm from '../components/dashboard/CreateHotspotForm';
import Analytics from '../components/dashboard/Analytics';
import cities from '../data/cities';
import api from '../api/axios';

const Dashboard = () => {
  const { user } = useAuth();

  const [hotspots, setHotspots] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(
    () => localStorage.getItem('shehar_city') || 'karachi'
  );
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activities, setActivities] = useState([]);

  const cityInfo = cities.find((c) => c.id === selectedCity) || cities[0];

  const filteredHotspots = useMemo(() => {
    return hotspots.filter((h) => {
      const cityMatch = (h.city || 'karachi') === selectedCity;

      const q = search.trim().toLowerCase();
      const searchMatch =
        !q ||
        h.title?.toLowerCase().includes(q) ||
        h.location?.toLowerCase().includes(q) ||
        h.description?.toLowerCase().includes(q);

      const typeMatch = typeFilter === 'all' || h.type === typeFilter;
      const severityMatch =
        severityFilter === 'all' || h.severity === severityFilter;
      const statusMatch =
        statusFilter === 'all' || (h.status || 'open') === statusFilter;

      return (
        cityMatch &&
        searchMatch &&
        typeMatch &&
        severityMatch &&
        statusMatch
      );
    });
  }, [
    hotspots,
    selectedCity,
    search,
    typeFilter,
    severityFilter,
    statusFilter,
  ]);

  const fetchData = async () => {
  try {
    const [hotspotsData, alertsData, activitiesData] = await Promise.all([
      getHotspots(),
      getAlerts(),
      getActivities(),
    ]);
    setHotspots(hotspotsData);
    setAlerts(alertsData);
    setActivities(activitiesData);
  } catch (error) {
    console.error('Failed to fetch data', error);
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm('Deactivate this hotspot?')) return;
    try {
      await deleteHotspot(id);
      fetchData();
    } catch (error) {
      console.error('Failed to delete hotspot', error);
      alert('Failed to deactivate hotspot');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateHotspot(id, { status });
      fetchData();
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Failed to update status');
    }
  };

  
  const handleCityChange = async (e) => {
  const value = e.target.value;
  setSelectedCity(value);
  localStorage.setItem('shehar_city', value);

  if (user?.role !== 'admin') {
    try {
      await api.put('/users/me/city', { city: value });
    } catch (err) {
      console.error(err);
    }
  }
};

  const exportCSV = () => {
    const headers = [
      'Title',
      'Location',
      'City',
      'Type',
      'Severity',
      'Status',
      'Description',
      'Lat',
      'Lng',
    ];

    const rows = filteredHotspots.map((h) => [
      h.title,
      h.location,
      h.city || 'karachi',
      h.type,
      h.severity,
      h.status || 'open',
      (h.description || '').replace(/"/g, '""'),
      h.coordinates?.lat ?? '',
      h.coordinates?.lng ?? '',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((r) =>
        r.map((cell) => `"${String(cell ?? '')}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shehar-flow-${selectedCity}-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
  fetchData();
}, []);

useEffect(() => {
  const socket = io('http://localhost:5000', {
    transports: ['websocket', 'polling'],
  });

  socket.on('hotspot:changed', () => {
    fetchData();
  });

  return () => {
    socket.disconnect();
  };
}, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* City selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800 border border-slate-700 rounded-xl p-4">
  <div>
    <p className="text-sm text-slate-400">
      {user?.role === 'admin' ? 'Operating city (admin)' : 'Your city'}
    </p>
    <p className="text-lg font-semibold">{cityInfo.name}</p>
  </div>
  <select
    value={selectedCity}
    onChange={handleCityChange}
    className="bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 min-w-[200px]"
  >
    {cities.map((c) => (
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ))}
  </select>
</div>

        {/* Filters */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Title, location, description..."
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">All types</option>
                <option value="motorcycle_conflict">Motorcycle conflict</option>
                <option value="encroachment">Encroachment</option>
                <option value="delivery_impact">Delivery impact</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Severity</label>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">All severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">All statuses</option>
                <option value="open">Open</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading data...</div>
        ) : (
          <>
            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-slate-800 to-slate-800/80 rounded-xl p-5 border border-slate-700">
                <p className="text-slate-400 text-sm font-medium">Total Hotspots</p>
                <p className="text-3xl font-bold mt-2">{filteredHotspots.length}</p>
                <p className="text-xs text-slate-500 mt-2">In {cityInfo.name}</p>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-800/80 rounded-xl p-5 border border-red-500/20">
                <p className="text-slate-400 text-sm font-medium">Critical Hotspots</p>
                <p className="text-3xl font-bold mt-2 text-red-400">
                  {
                    filteredHotspots.filter((h) => h.severity === 'critical')
                      .length
                  }
                </p>
                <p className="text-xs text-slate-500 mt-2">Needs immediate attention</p>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-800/80 rounded-xl p-5 border border-orange-500/20">
                <p className="text-slate-400 text-sm font-medium">Active Alerts</p>
                <p className="text-3xl font-bold mt-2 text-orange-400">
                  {alerts.length}
                </p>
                <p className="text-xs text-slate-500 mt-2">Live notifications</p>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-800/80 rounded-xl p-5 border border-blue-500/20">
                <p className="text-slate-400 text-sm font-medium">City</p>
                <p className="text-3xl font-bold mt-2 text-blue-400">
                  {cityInfo.name}
                </p>
                <p className="text-xs text-slate-500 mt-2">Current focus area</p>
              </div>
            </div>

            {/* Map */}
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Live Map</h2>
                  <p className="text-sm text-slate-400">
                    {cityInfo.name} • Real-time hotspots
                  </p>
                </div>
                <span className="text-xs bg-green-500/10 text-green-400 px-2.5 py-1 rounded-full border border-green-500/20">
                  Live
                </span>
              </div>
              <MapView
                hotspots={filteredHotspots}
                center={[cityInfo.lat, cityInfo.lng]}
              />
            </div>

            {/* Analytics */}
            <Analytics hotspots={filteredHotspots} />

            {/* Create form — Admin */}
            {user?.role === 'admin' && (
              <CreateHotspotForm
                onCreated={fetchData}
                selectedCity={selectedCity}
              />
            )}

            {/* Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Active Hotspots</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">
                      {filteredHotspots.length} locations
                    </span>
                    <button
                      onClick={exportCSV}
                      className="text-xs bg-slate-700 hover:bg-slate-600 border border-slate-600 px-3 py-1.5 rounded-lg transition"
                    >
                      Export CSV
                    </button>
                  </div>
                </div>

                {filteredHotspots.length === 0 ? (
                  <p className="text-slate-400">
                    No hotspots for {cityInfo.name} yet. Create one as Admin.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {filteredHotspots.map((spot) => (
                      <div
                        key={spot._id}
                        className="bg-slate-800/60 border border-slate-700 hover:border-slate-500 rounded-xl p-4 transition"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div>
                            <h3 className="font-semibold">{spot.title}</h3>
                            <p className="text-sm text-slate-400 mt-1">
                              {spot.location}
                            </p>
                            <p className="text-sm text-slate-500 mt-2">
                              {spot.description}
                            </p>
                          </div>
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full border font-medium capitalize whitespace-nowrap ${getSeverityColor(
                              spot.severity
                            )}`}
                          >
                            {spot.severity}
                          </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs text-slate-500 capitalize">
                            {spot.type.replace('_', ' ')} •{' '}
                            {spot.status || 'open'}
                          </span>
                          <div className="flex items-center gap-2">
                            {(user?.role === 'admin' ||
                              user?.role === 'operator') && (
                              <select
                                value={spot.status || 'open'}
                                onChange={(e) =>
                                  handleStatusChange(spot._id, e.target.value)
                                }
                                className="text-xs bg-slate-900 border border-slate-600 rounded px-2 py-1 focus:outline-none"
                              >
                                <option value="open">Open</option>
                                <option value="investigating">
                                  Investigating
                                </option>
                                <option value="resolved">Resolved</option>
                              </select>
                            )}
                            {user?.role === 'admin' && (
                              <button
                                onClick={() => handleDelete(spot._id)}
                                className="text-xs text-red-400 hover:text-red-300"
                              >
                                Deactivate
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 h-fit">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Live Alerts</h2>
                  <span className="text-xs text-slate-400">
                    {alerts.length} active
                  </span>
                </div>

                {alerts.length === 0 ? (
                  <p className="text-slate-400">No alerts</p>
                ) : (
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div
                        key={alert._id}
                        className="bg-slate-800/60 border border-slate-700 rounded-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                              alert.severity === 'critical'
                                ? 'bg-red-500'
                                : alert.severity === 'high'
                                ? 'bg-orange-500'
                                : 'bg-blue-500'
                            }`}
                          />
                          <div>
                            <p className="text-sm">{alert.message}</p>
                            <p className="text-xs text-slate-500 mt-1.5">
                              {alert.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;