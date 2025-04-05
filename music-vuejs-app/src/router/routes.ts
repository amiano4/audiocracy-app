import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Guest",
    component: () => import("../layouts/GuestLayout.vue"),
    redirect: { name: "Login" },
    meta: { guestOnly: true },
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("../views/auth/LoginPage.vue"),
      },
      {
        path: "create-account",
        name: "Sign Up",
        component: () => import("../views/auth/SignUpPage.vue"),
      },
    ],
  },

  // auth
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    meta: { requireAuth: true },
    redirect: { name: "Dashboard" },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../views/DashboardPage.vue"),
      },
    ],
  },
];

export default routes;
