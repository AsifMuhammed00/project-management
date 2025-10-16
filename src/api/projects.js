import api from './auth';

const showMessage = (type, content) => {
  if (window.__messageApi) {
    window.__messageApi[type](content);
  }
};

export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch projects. Please try again.';
    showMessage('error', errorMessage);
    throw new Error(errorMessage);
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch project details.';
    showMessage('error', errorMessage);
    throw new Error(errorMessage);
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to create project. Please try again.';
    showMessage('error', errorMessage);
    throw new Error(errorMessage);
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update project. Please try again.';
    showMessage('error', errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteProject = async (id) => {
  try {
    await api.delete(`/projects/${id}`);
    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to delete project. Please try again.';
    showMessage('error', errorMessage);
    throw new Error(errorMessage);
  }
};