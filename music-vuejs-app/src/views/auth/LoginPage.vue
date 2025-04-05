<template>
  <section class="flex column center full-height">
    <Brand style="margin-bottom: 3rem" />
    <form class="flex full-width column gap-1" @submit.prevent="submit" novalidate>
      <form-control
        label="Email Address"
        v-model="user.email"
        type="email"
        placeholder="Enter email address"
        :rules="{ required: true, email: true }"
      />
      <form-control
        label="Password"
        v-model="user.password"
        type="password"
        placeholder="Enter password"
        :rules="{ required: true }"
      />

      <Button type="submit" label="Login" :disabled="!btnStatus" />
    </form>
    <p class="form-footer-nav-link">
      <router-link :to="{ name: 'Sign Up' }"> Create new account </router-link>
    </p>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Button, FormControl, Brand } from "@/components/ui";
import { handleSubmit } from "@/assets/utils/validation";
import type { IUserLogin } from "@/composables/interfaces/IUser";
import { useAuthStore } from "@/composables/stores/authStore";
import { useAlertStore } from "@/composables/stores/alertStore";
import { useRouter } from "vue-router";

const btnStatus = ref(true);
const authStore = useAuthStore();
const alertStore = useAlertStore();
const router = useRouter();
const user = reactive<IUserLogin>({
  email: "",
  password: "",
});

const submit = handleSubmit(() => {
  btnStatus.value = false; // disable login button

  authStore
    .login(user)
    .then(() => {
      router.push({ name: "Dashboard" });
    })
    .catch((err) => {
      console.error(err);

      alertStore.addAlert({
        message: "Unable to login",
        type: "error",
      });
    })
    .finally(() => {
      btnStatus.value = true;
    });
});
</script>
