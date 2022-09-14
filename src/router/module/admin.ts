import type { RouteRecordRaw } from "vue-router";

export default {
  name: "admin",
  path: "/admin",
  redirect: "/admin/home",
  component: () => import("@/layouts/admin.vue"),
  meta: {
    auth: true,
    menu: {
      title: "首頁",
      icon: "fas fa-house",
      isClick: false,
    },
  },
  children: [
    {
      name: "admin.home",
      path: "home",
      component: () => import("@/views/admin/home.vue"),
      meta: { menu: { title: "用戶介面" } },
    },
    {
      name: "note",
      path: "note",
      component: () => import("@/views/note/note.vue"),
      meta: { menu: { title: "備忘錄" } },
    },
  ],
} as RouteRecordRaw;
