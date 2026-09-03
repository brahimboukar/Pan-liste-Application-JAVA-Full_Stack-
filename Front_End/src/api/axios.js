import axios from "axios";

export const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8080/',
    withCredentials: true,

});

axiosClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
/*
axiosClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 403 || error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);*/
