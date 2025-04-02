<template>
  <div class="flex center brand" v-bind="$attrs">
    <Logo size="3.5rem" />
    <h2 class="m-0 font-poppins brand-text">Audiocracy</h2>
  </div>
</template>

<script setup lang="ts">
import { Logo } from "@/components/ui";
</script>

<style lang="scss">
.brand {
  gap: 0.5rem;

  .brand-text {
    color: #21353f;
  }
}
</style>
