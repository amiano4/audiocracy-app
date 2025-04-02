<template>
  <router-view />
  <alert-container />
</template>

<script lang="ts" setup>
import { axios } from "./axios";
import { AlertContainer } from "@/components/ui";

axios.get("sanctum/csrf-cookie");
</script>
