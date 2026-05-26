import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Interceptor pour ajouter le token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('karel_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const homeService = {
  getHomeData: () => api.get('/home').then(res => res.data)
};

export const serviceService = {
  getAll: (type = null) => {
    const url = type ? `/services?type=${type}` : '/services';
    return api.get(url).then(res => res.data);
  }
};

export const reservationService = {
  submit: (data) => api.post('/reservations', data).then(res => res.data)
};

export const authService = {
  login: (credentials) => api.post('/login', credentials).then(res => {
    if (res.data.token) {
      localStorage.setItem('karel_token', res.data.token);
      localStorage.setItem('karel_user', JSON.stringify(res.data.user));
    }
    return res.data;
  }),
  register: (data) => api.post('/register', data).then(res => {
    if (res.data.token) {
      localStorage.setItem('karel_token', res.data.token);
      localStorage.setItem('karel_user', JSON.stringify(res.data.user));
    }
    return res.data;
  }),
  logout: () => {
    localStorage.removeItem('karel_token');
    localStorage.removeItem('karel_user');
    return api.post('/logout').catch(() => {});
  },
  getUser: () => {
    const user = localStorage.getItem('karel_user');
    return user ? JSON.parse(user) : null;
  }
};

export default api;