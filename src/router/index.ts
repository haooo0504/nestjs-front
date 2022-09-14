import userStore from "@/stores/userStore";
import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import autoload from "./autoload";
import guard from "./guard";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes],
});
export async function setupRouter(app: App) {
  const user = userStore();
  // await user.getUserInfo();

  autoload(router);
  guard(router);
  app.use(router);
}
export default router;
