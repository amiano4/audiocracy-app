<template>
  <router-view />
</template>

<script lang="ts" setup>
import { axios } from "./axios";

axios.get("sanctum/csrf-cookie");
</script>
