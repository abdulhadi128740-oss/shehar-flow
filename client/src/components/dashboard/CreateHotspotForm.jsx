import { useState } from 'react';
import { createHotspot } from '../../api/dashboard';
import cities from '../../data/cities';

const CreateHotspotForm = ({ onCreated, selectedCity = 'karachi' }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'motorcycle_conflict',
    severity: 'medium',
    description: '',
    lat: '',
    lng: '',
    city: selectedCity,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = {
        title: formData.title,
        location: formData.location,
        type: formData.type,
        severity: formData.severity,
        description: formData.description,
        city: formData.city || selectedCity,
        status: 'open',
        coordinates: {
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng),
        },
      };

      await createHotspot(payload);
      setMessage('Hotspot created successfully!');
      setFormData({
        title: '',
        location: '',
        type: 'motorcycle_conflict',
        severity: 'medium',
        description: '',
        lat: '',
        lng: '',
        city: selectedCity,
      });
      onCreated();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create hotspot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <h2 className="text-lg font-semibold text-white mb-4">Create New Hotspot</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${
            message.includes('successfully')
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="e.g. Teen Hatti Intersection"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            >
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            placeholder="e.g. Liberty, Lahore"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="motorcycle_conflict">Motorcycle Conflict</option>
              <option value="encroachment">Encroachment</option>
              <option value="delivery_impact">Delivery Impact</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Severity</label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="24.8607"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              name="lng"
              value={formData.lng}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="67.0011"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            placeholder="Describe the problem..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Hotspot'}
        </button>
      </form>
    </div>
  );
};

export default CreateHotspotForm;