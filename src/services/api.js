import axios from 'axios';

const API = axios.create({
    // baseURL: 'http://127.0.0.1:8000/api/',

 API_BASE_URL : "https://karthiga.pythonanywhere.com",

});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');

                if (!refreshToken) {
                    localStorage.clear();
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                const res = await axios.post(
                    'http://127.0.0.1:8000/api/auth/refresh/',
                    {
                        refresh: refreshToken,
                    }
                );

                localStorage.setItem('access_token', res.data.access);
                originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

                return API(originalRequest);
            } catch (refreshError) {
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API;