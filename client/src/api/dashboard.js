import api from './axios';

export const getHotspots = async () => {
  const { data } = await api.get('/hotspots');
  return data;
};

export const getAlerts = async () => {
  const { data } = await api.get('/alerts');
  return data;
};

export const createHotspot = async (hotspotData) => {
  const { data } = await api.post('/hotspots', hotspotData);
  return data;
};

export const deleteHotspot = async (id) => {
  const { data } = await api.delete(`/hotspots/${id}`);
  return data;
};

export const updateHotspot = async (id, updates) => {
  const { data } = await api.put(`/hotspots/${id}`, updates);
  return data;
};

export const getActivities = async () => {
  const { data } = await api.get('/activities?limit=20');
  return data;
};