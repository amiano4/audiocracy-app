<template>
  <router-view />
</template>

<script lang="ts" setup>
import { axios } from "./composables/axios";

axios.get("sanctum/csrf-cookie");
</script>
