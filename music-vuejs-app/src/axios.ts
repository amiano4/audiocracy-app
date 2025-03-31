import { default as AxiosInstance } from "axios";

const DEFAULT_SETTINGS = {
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_HOST || "https://localhost",
};

const api = AxiosInstance.create({
  ...DEFAULT_SETTINGS,
  baseURL: `${DEFAULT_SETTINGS.baseURL}/api`,
});

const axios = AxiosInstance.create(DEFAULT_SETTINGS);

export { axios, api };
