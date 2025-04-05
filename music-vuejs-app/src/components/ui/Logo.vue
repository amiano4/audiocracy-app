<template>
  <div>
    <img
      :src="src"
      :style="{
        width: size,
        height: size,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import logoSrc from "@/assets/logo.png";

interface Props {
  src?: string;
  size?: string;
}

withDefaults(defineProps<Props>(), {
  src: logoSrc,
  size: "100px",
});
</script>
