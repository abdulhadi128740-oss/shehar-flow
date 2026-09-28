import api from './axios';

export const getUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export const createUser = async (userData) => {
  const { data } = await api.post('/users', userData);
  return data;
};

export const updateUserRole = async (id, role) => {
  const { data } = await api.put(`/users/${id}/role`, { role });
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};
