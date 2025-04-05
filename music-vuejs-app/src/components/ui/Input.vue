<template>
  <div class="form-group">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      v-bind="$attrs"
      :type="type"
      :value="modelValue"
      :class="['form-input', { 'border-red-500': errorMessage }]"
      @input="updateValue"
      :placeholder="placeholder"
      :data-form-control="formControlType"
      ref="inputRef"
    />
    <p v-if="errorMessage || customError" class="form-error m-0">{{ errorMessage || customError }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { ValidationRules } from "@/assets/utils/validation";

type InputValue = string | number;

interface Props {
  modelValue: InputValue;
  label?: string;
  type?: string;
  id?: string;
  rules?: Record<string, any> | null;
  placeholder?: string;
  customError?: string | null;
}

// Define props with default values
const props = withDefaults(defineProps<Props>(), {
  type: "text",
  id: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  placeholder: "",
  rules: null,
});

// Define emit event
const emit = defineEmits(["update:modelValue"]);

const model = ref<InputValue>(props.modelValue);
const inputRef = ref<any>(null);
const errorMessage = ref<string | null>(null);

const isSubmitted = () => {
  if (inputRef.value instanceof HTMLElement) {
  }

  return inputRef.value.closest("form[data-submitted]") != null;
};

const evalErrors = () => {
  if (!props.rules || !isSubmitted()) return;

  for (const [rule, value] of Object.entries(props.rules)) {
    if (value === false) continue;

    if (rule in ValidationRules) {
      const result = ValidationRules[rule](model.value, value);

      if (result !== true) {
        errorMessage.value = result;
        return;
      }
    }
  }

  errorMessage.value = null;
};

// Function to update value
const updateValue = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  model.value = value;
  emit("update:modelValue", value);

  setTimeout(evalErrors, 100);
};

const formControlType = computed((): "error" | "active" | "idle" => {
  return errorMessage.value !== null ? "error" : props.rules !== null ? "active" : "idle";
});

// Watch for modelValue changes
watch(
  () => props.modelValue,
  (newValue) => {
    model.value = newValue;
  }
);

// Watch for rules changes
watch(() => props.rules, evalErrors, { deep: true });
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.form-label {
  font-size: 0.875rem;
  font-weight: 600;
}
.form-input {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 12px;
  outline: none;
  transition: border 0.2s;
}
.form-input:focus {
  border-color: #6366f1;
}
.form-error {
  color: #ef4444;
  font-size: 0.7rem;
  font-weight: 600;
}
</style>
