import { defineStore } from "pinia";
import { ref } from "vue";

import type { Alert, AlertPosition } from "../types/alertTypes.ts";

export const useAlertStore = defineStore("alert", () => {
  const alerts = ref<Alert[]>([]);
  let idCounter = 0;
  const position = ref<AlertPosition>("bottom-right");

  const addAlert = (alert: Omit<Alert, "id">) => {
    const newAlert: Alert = { id: idCounter++, autoDismiss: true, ...alert };
    alerts.value.push(newAlert);

    if (newAlert.autoDismiss) {
      setTimeout(() => removeAlert(newAlert.id), alert.duration || 5000);
    }

    return newAlert.id;
  };

  const removeAlert = (id: number) => {
    alerts.value = alerts.value.filter((alert) => alert.id !== id);
  };

  return { alerts, addAlert, removeAlert, position };
});
