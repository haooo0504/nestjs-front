import type { RouteRecordRaw } from "vue-router";
import util from "@/utils";
const layouts = import.meta.globEager("@/layouts/*.vue");
const views = import.meta.globEager("@/views/**/*.vue");

function getRoutes() {
  const layoutRoutes = [] as RouteRecordRaw[];
  Object.entries(layouts).forEach(([file, module]) => {
    const route = getRouteByModule(file, module);
    route.children = getChildrenRoutes(route);
    layoutRoutes.push(route);
  });
  return layoutRoutes;
}

function getChildrenRoutes(layoutRoute: RouteRecordRaw) {
  // console.log(layoutRoute)
  const routes = [] as RouteRecordRaw[];
  Object.entries(views).forEach(([file, module]) => {
    if (file.includes(`../views/${layoutRoute.name as string}`)) {
      const route = getRouteByModule(file, module);

      routes.push(route);
    }
  });
  return routes;
}

function getRouteByModule(file: string, module: { [key: string]: any }) {
  const name = file.replace(/.+layouts\/|.+views\/|\.vue/gi, "");
  const route = {
    name: name.replace("/", "."),
    path: `/${name}`,
    component: module.default,
  } as RouteRecordRaw;

  return Object.assign(route, module.default?.route);
}

export default getRoutes;
