export type AlertType = "success" | "error" | "warning" | "info";

export type AlertPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";

export interface Alert {
  id: number;
  message: string;
  type: AlertType;
  dismissible?: boolean;
  autoDismiss?: boolean;
  duration?: number;
}
