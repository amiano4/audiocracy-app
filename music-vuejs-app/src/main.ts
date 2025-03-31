import { createApp } from "vue";
import "./assets/scss/styles.scss";
import "./assets/scss/helpers.scss";
import router from "./router/index.ts";

import App from "./App.vue";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app
  .use(router) // vue-router
  .use(pinia) // state-management
  .mount("#app");
