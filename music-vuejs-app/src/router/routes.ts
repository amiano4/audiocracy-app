import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../layouts/GuestLayout.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("../views/auth/LoginPage.vue"),
      },
      {
        path: "",
        name: "Sign Up",
        component: () => import("../views/auth/SignUpPage.vue"),
      },
    ],
  },
];

export default routes;
