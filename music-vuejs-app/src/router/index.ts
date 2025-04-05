import { createRouter, createWebHistory, type Router } from "vue-router";
import routes from "./routes";
import { useAuthStore } from "@/composables/stores/authStore";

const router: Router = createRouter({
  scrollBehavior: () => ({ top: 0, left: 0, behavior: "smooth" }),
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isLoggedIn;
  const hasToken = !!authStore.getToken;

  // after page reload/refresh
  if (hasToken && !isAuthenticated) {
    await authStore.refresh();
  }

  // accessing auth pages but not signed in
  if (!isAuthenticated && to.meta.requireAuth) {
    return next({ name: "Guest" });
  }

  // accessing guest-only pages while currently signed in
  if (to.meta.guestOnly && (isAuthenticated || hasToken)) {
    return next({ name: "Dashboard" });
  }

  next();
});

export default router;
