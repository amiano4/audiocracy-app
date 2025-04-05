import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { api } from "../../axios";
import type { IUserLogin } from "../interfaces/IUser";
import { useUserStore } from "./userStore";

export type AuthToken = string | null;

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref<AuthToken>(null);
    const loginStatus = ref<boolean>(false);
    const userStore = useUserStore();

    const getToken = computed((): AuthToken => token.value);
    const isLoggedIn = computed((): boolean => loginStatus.value);

    const setToken = (newToken: AuthToken): void => {
      token.value = newToken;
    };

    const hydrateData = (response: any) => {
      // Get token from headers
      const resourceToken = response?.headers["resource-token"];
      setToken(resourceToken || null);

      // set login status
      loginStatus.value = resourceToken ? true : false;

      // store user data
      userStore.setUser(response?.data || null);
    };

    const refresh = async () => {
      try {
        const response = await api.get("me");
        hydrateData(response);
      } catch (error) {
        console.error(error);
      }
    };

    const login = async (credentials: IUserLogin): Promise<void> => {
      try {
        const response = await api.post("login", credentials);
        hydrateData(response);
      } catch (error) {
        console.error(error);
      }
    };

    const logout = async (): Promise<void> => {
      try {
        await api.get("logout");

        hydrateData(null);
      } catch (err) {
        console.error(err);
      }
    };

    return { token, loginStatus, setToken, getToken, refresh, login, logout, isLoggedIn };
  },
  {
    persist: {
      pick: ["token"], // persist only the token
    },
  }
);
