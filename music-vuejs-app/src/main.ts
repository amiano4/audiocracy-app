import { createApp } from "vue";
import "./assets/scss/styles.scss";
import "./assets/scss/helpers.scss";
import router from "./router/index.ts";

import App from "./App.vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const pinia = createPinia();
const app = createApp(App);

pinia.use(
  createPersistedState({
    key: (id: string) => "audiocracy_app_" + id,
  })
);

app
  .use(router) // vue-router
  .use(pinia) // state-management
  .mount("#app");
