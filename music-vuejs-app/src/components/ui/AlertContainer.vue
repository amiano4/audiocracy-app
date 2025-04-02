<template>
  <div class="alert-container" :class="positionClass">
    <transition-group name="fade" tag="div">
      <div v-for="alert in alertStore.alerts" :key="alert.id" :class="['alert', `alert-${alert.type}`]">
        <span>{{ alert.message }}</span>
        <button v-if="alert.dismissible" class="close-btn" @click="alertStore.removeAlert(alert.id)">&times;</button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAlertStore } from "@/composables/stores/alertStore";
import type { AlertPosition } from "@/composables/types/alertTypes";

const alertStore = useAlertStore();

const positionClass = computed<string>(() => {
  const positions: Record<AlertPosition, string> = {
    "top-left": "alert-top-left",
    "top-right": "alert-top-right",
    "bottom-left": "alert-bottom-left",
    "bottom-right": "alert-bottom-right",
    "top-center": "alert-top-center",
    "bottom-center": "alert-bottom-center",
  };

  return positions[alertStore.position] || "alert-top-right"; // Default position
});
</script>

<style scoped>
/*  Alert container positioning */
.alert-container {
  position: fixed;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Positions */
.alert-top-left {
  top: 10px;
  left: 10px;
}
.alert-top-right {
  top: 10px;
  right: 10px;
}
.alert-bottom-left {
  bottom: 10px;
  left: 10px;
}
.alert-bottom-right {
  bottom: 10px;
  right: 10px;
}
.alert-top-center {
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.alert-bottom-center {
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.alert {
  padding: 12px 16px;
  border-radius: 5px;
  font-size: 14px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 250px;
  max-width: 400px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease-in-out;
  margin-top: 10px;
}

.alert-success {
  background-color: #28a745;
}
.alert-error {
  background-color: #dc3545;
}
.alert-warning {
  background-color: #ffc107;
  color: #333;
}
.alert-info {
  background-color: #17a2b8;
}

/* Close Button */
.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
}

/* Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
