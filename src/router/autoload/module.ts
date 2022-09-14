import type { RouteRecordRaw } from "vue-router";

export default function autoloadModuleRoutes() {
  const modules = import.meta.globEager("../module/**/*.ts");
  const routes = [] as RouteRecordRaw[];
  Object.keys(modules).forEach((key) => {
    // console.log(modules[key].default);
    routes.push(modules[key].default);
  });
  return routes;
}