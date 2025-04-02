export type ValidationType = Record<string, any>;

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; // regex for validating email format

const isNum = (value: any) => typeof value === "number";

// Required field validation: checks if value is non-empty
const required = (value: string) => !!value || "This field is required";

// Email validation: checks if the value matches the email regex
const email = (value: string) => emailRegex.test(value) || "Invalid email";

// Confirmed validation: checks if two values are equal
const equals = (value1: string, value2: string) => value1 === value2 || "Do not match";

// Max length validation: checks if the value length is less than or equal to the max length
const max = (value: string, max: number) =>
  (isNum(value) ? value : value.length) <= max || `${isNum(value) ? "Max value" : "Character max limit"} exceeded`;

// Min length validation: checks if the value length is greater than or equal to the min length
const min = (value: string, min: number) =>
  (isNum(value) ? value : value.length) >= min ||
  `${isNum(value) ? "Minimum value" : "Minimum character length"} is ` + min;

export const handleSubmit = (callback: (event?: Event) => void) => {
  return (event: Event) => {
    const form = event.target as HTMLFormElement;
    form.setAttribute("data-submitted", "");

    setTimeout(() => {
      // trigger input events
      form.querySelectorAll("[data-form-control=active]").forEach((el) => {
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          // Trigger 'input' event for text inputs and textareas
          el.dispatchEvent(new Event("input"));
        } else if (
          el instanceof HTMLSelectElement ||
          (el instanceof HTMLInputElement && (el.type === "checkbox" || el.type === "radio"))
        ) {
          // Trigger 'change' event for select/checkbox/radio elements
          el.dispatchEvent(new Event("change"));
        }
      });
    }, 100);

    if (!form.querySelectorAll("[data-form-control=error]")?.length) {
      callback(event);
    }
  };
};

export const ValidationRules = { required, email, equals, max, min };
