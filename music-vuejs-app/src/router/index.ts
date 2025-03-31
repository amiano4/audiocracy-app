import { createRouter, createWebHistory, type Router } from "vue-router";
import routes from "./routes";

const router: Router = createRouter({
  scrollBehavior: () => ({ top: 0, left: 0, behavior: "smooth" }),
  history: createWebHistory(),
  routes,
});

export default router;
