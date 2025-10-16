import api from './auth';

const showMessage = (type, content) => {
  if (window.__messageApi) {
    window.__messageApi[type](content);
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch users. Please try again.';
    showMessage('error', errorMessage);
    throw new Error(errorMessage);
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch user details.';
    showMessage('error', errorMessage);
    throw new Error(errorMessage);
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to create user. Please try again.';
    showMessage('error', errorMessage);
    throw new Error(errorMessage);
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update user. Please try again.';
    showMessage('error', errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to delete user. Please try again.';
    showMessage('error', errorMessage);
    throw new Error(errorMessage);
  }
};