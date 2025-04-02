<template>
  <button
    v-bind="$attrs"
    :class="['btn', buttonType, size, disabled ? 'disabled' : '']"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Props
const props = defineProps({
  color: {
    type: String,
    default: "primary", // Default to primary button style
  },
  size: {
    type: String,
    default: "medium", // Default size
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: null,
  },
});

// Computed property for button type
const buttonType = computed(() => `btn-${props.color}`);

// Method to handle button click
const handleClick = () => {
  if (props.disabled) return; // Prevent click if disabled
  emit("click");
};

// Emit function for event
const emit = defineEmits();
</script>

<style scoped>
/* Base styles for button */
.btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: scale(1.05);
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
  transform: scale(1.05);
}

.btn-warning {
  background-color: #ffc107;
  color: black;
}

.btn-warning:hover {
  background-color: #e0a800;
  transform: scale(1.05);
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
  transform: scale(1.05);
}

.btn-light {
  background-color: #f8f9fa;
  color: black;
}

.btn-light:hover {
  background-color: #e2e6ea;
  transform: scale(1.05);
}

.btn-dark {
  background-color: #343a40;
  color: white;
}

.btn-dark:hover {
  background-color: #23272b;
  transform: scale(1.05);
}

/* Size variants */
.btn.small {
  padding: 5px 10px;
  font-size: 14px;
}

.btn.medium {
  padding: 10px 20px;
  font-size: 16px;
}

.btn.large {
  padding: 15px 30px;
  font-size: 18px;
}

/* Disabled button styles */
.btn.disabled,
.btn:disabled {
  background-color: #e0e0e0;
  color: #bdbdbd;
  cursor: not-allowed;
}
</style>
