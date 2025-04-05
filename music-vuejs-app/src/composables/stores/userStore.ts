import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { IAuthUser } from "../interfaces/IUser";

type UserProp = string | null;
export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref<IAuthUser | null>(null);

    const getName = computed((): UserProp => user.value?.name || null);
    const getEmail = computed((): UserProp => user.value?.email || null);
    const getRole = computed((): UserProp => user.value?.role || null);
    const getCreatedAt = computed((): UserProp => user.value?.created || null);

    const setUser = (userData: IAuthUser) => {
      user.value = userData;
    };

    const clearUser = () => {
      user.value = null;
    };

    return {
      getName,
      getEmail,
      getRole,
      getCreatedAt,
      setUser,
      clearUser,
    };
  },
  {
    persist: {
      pick: ["user"],
    },
  }
);
