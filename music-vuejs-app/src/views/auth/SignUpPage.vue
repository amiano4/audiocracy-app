<template>
  <section class="flex column center full-height">
    <div class="flex column">
      <Brand />
      <p class="text-dark">Create new account</p>
    </div>
    <form class="flex full-width column gap-1" @submit.prevent="submit" novalidate>
      <form-control label="Name" v-model="user.name" placeholder="Enter full name" :rules="{ required: true }" />
      <form-control
        label="Email Address"
        v-model="user.email"
        type="email"
        placeholder="Enter email address"
        :rules="{ required: true, email: true }"
        :custom-error="customErrors.email"
        @update:model-value="customErrors.email = null"
      />
      <form-control
        label="Password"
        v-model="user.password"
        type="password"
        placeholder="Enter password"
        :rules="{ required: true, equals: user.password_confirmation, min: 6 }"
        :custom-error="customErrors.password"
        @update:model-value="customErrors.password = null"
      />
      <form-control
        label="Confirm Password"
        v-model="user.password_confirmation"
        type="password"
        placeholder="Confirm password"
        :rules="{ required: true, equals: user.password }"
      />

      <Button type="submit" label="Submit" :disabled="!btnStatus" />
    </form>
    <p class="form-footer-nav-link">
      Already have an account?
      <br />
      <br />
      <router-link :to="{ name: 'Login' }"> Login here </router-link>
    </p>
  </section>
</template>

<script lang="ts" setup>
import { FormControl, Button, Brand } from "@/components/ui";
import type { IUserRegistration } from "@/composables/interfaces/IUser";
import { reactive, ref } from "vue";
import { handleSubmit } from "@/assets/utils/validation";
import { api } from "@/axios";
import { useAlertStore } from "@/composables/stores/alertStore";
import { useRouter } from "vue-router";

const router = useRouter();
const alertStore = useAlertStore();
const btnStatus = ref(true);
const customErrors = reactive({
  email: null,
  password: null,
});

const user = reactive<IUserRegistration>({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const resetCustomErrors = () => {
  customErrors.email = null;
  customErrors.password = null;
};

const submit = handleSubmit(() => {
  btnStatus.value = false;
  resetCustomErrors();

  api
    .post("sign-up", user)
    .then(() => {
      alertStore.addAlert({
        message: "🎉 Registration successful!",
        type: "success",
      });

      router.push({ name: "Login" });
    })
    .catch((err) => {
      if (err?.status == 422) {
        const errors = err.response.data.errors;

        if (errors.email) {
          // display email error
          customErrors.email = errors.email[0];
        } else if (errors.password) {
          // display password error
          customErrors.password = errors.password[0];
        } else {
          // show error alert
          alertStore.addAlert({
            message: err.response.data.message || "Registration failed. Please check the form for errors.",
            type: "error",
          });
        }
      } else if (err?.status == 429) {
        //  too many requests
        alertStore.addAlert({
          message: "Too many requests, please try again later.",
          type: "error",
        });
      }
    })
    .finally(() => {
      btnStatus.value = true;
    });
});
</script>
