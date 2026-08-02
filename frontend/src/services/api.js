import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// The token is injected from outside (see App.jsx) rather than read from
// storage here, since we're keeping it in memory via AuthContext.
let authToken = null;
export function setAuthToken(token) {
  authToken = token;
}

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  return data.token;
}

// Generic CRUD helpers - each resource (projects, skills, achievements)
// follows the same REST shape on the backend, so one set of functions
// covers all three rather than repeating this per resource.
export function createResourceApi(resource) {
  return {
    getAll: () => api.get(`/${resource}`).then((res) => res.data),
    getById: (id) => api.get(`/${resource}/${id}`).then((res) => res.data),
    create: (payload) => api.post(`/${resource}`, payload).then((res) => res.data),
    update: (id, payload) => api.put(`/${resource}/${id}`, payload).then((res) => res.data),
    remove: (id) => api.delete(`/${resource}/${id}`).then((res) => res.data),
  };
}

export const projectsApi = createResourceApi('projects');
export const skillsApi = createResourceApi('skills');
export const achievementsApi = createResourceApi('achievements');

export async function getAbout() {
  const { data } = await api.get('/about');
  return data;
}

export async function updateAbout(payload) {
  const { data } = await api.put('/about', payload);
  return data;
}

export default api;
