import { default as AxiosInstance } from "axios";
import { useAuthStore } from "./composables/stores/authStore";

const DEFAULT_SETTINGS = {
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_HOST || "https://localhost",
};

const api = AxiosInstance.create({
  ...DEFAULT_SETTINGS,
  baseURL: `${DEFAULT_SETTINGS.baseURL}/api`,
});

const axios = AxiosInstance.create(DEFAULT_SETTINGS);

// Add request interceptor to handle token and branch headers
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();

    // sanctum authentication (SPA)
    if (authStore.getToken) {
      config.headers.Authorization = `Bearer ${authStore.getToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => {
//     const resourceId = response.headers["resource-token"];
//     const authStore = useAuthStore();

//     if (resourceId !== authStore.getToken) {
//       // store auth/resource token
//       authStore.setToken(resourceId);
//     }

//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export { axios, api };
