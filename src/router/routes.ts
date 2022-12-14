import type { RouteRecordRaw } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/login.vue"),
    meta: { guest: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/auth/register.vue"),
    meta: { guest: true },
  },

  {
    path: "/:any(.*)",
    name: "notFound",
    component: () => import("../views/error/404.vue"),
  },
] as RouteRecordRaw[];

export default routes;
