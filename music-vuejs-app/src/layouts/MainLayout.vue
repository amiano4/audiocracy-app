<template>
  <div class="full-container">
    <header class="flex items-center">
      <Logo size="3rem" />
      <FormControl placeholder="Search..." v-model="search" />
    </header>
    <main class="bg-danger"></main>
  </div>
</template>

<script lang="ts" setup>
import { FormControl, Logo } from "@/components/ui";
import { ref } from "vue";

const search = ref("");
</script>

<style lang="scss">
main {
  flex-grow: 1;
}

header {
  padding: 1rem;
  gap: 1rem;
}
</style>
