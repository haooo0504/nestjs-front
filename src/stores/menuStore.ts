import { defineStore } from "pinia";
import type { User } from "@/apis/userApi";
import type {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteRecordRaw,
} from "vue-router";
import type { IMenu } from "types/menu";
import router from "@/router";
import utils from "@/utils";
import { CacheEnum } from "@/enum/cacheEnum";
import { ref } from "vue";
import store from "@/utils/store";

export default defineStore({
  id: "menu",
  state: () => {
    return {
      menus: [] as IMenu[],
      historyMenu: [] as IMenu[],
      close: ref(store.get(CacheEnum.MENU_IS_CLOSE) ?? false),
      route: ref(null as null | RouteLocationNormalized),
      isHistoryCollapse:
        <boolean>store.get(CacheEnum.HISTORYLINK_IS_SHOW) ?? true,
    };
  },
  actions: {
    init() {
      this.getMenuByRoutes();
      this.historyMenu = this.getHistoryMenu();
    },
    getHistoryMenu() {
      const routes = [] as RouteRecordRaw[];
      router.getRoutes().map((r) => routes.push(...r.children));

      let menus: IMenu[] = utils.store.get(CacheEnum.HISROTY_MENU) ?? [];
      return menus.filter((m) => {
        return routes.some((r) => r.name == m.route);
      });
    },
    toggleState() {
      this.close = !this.close;
      store.set(CacheEnum.MENU_IS_CLOSE, this.close);
      // console.log(this.close);
    },
    setCurrentMenu(route: RouteLocationNormalizedLoaded) {
      this.menus.forEach((m) => {
        m.isClick = false;
        m.children?.forEach((c) => {
          c.isClick = false;
          if (c.route == route.name) {
            m.isClick = true;
            c.isClick = true;
          }
        });
      });
    },
    removeHistoryMenu(menu: IMenu) {
      const index = this.historyMenu.indexOf(menu);
      this.historyMenu.splice(index, 1);
      utils.store.set(CacheEnum.HISROTY_MENU, this.historyMenu);
    },
    addHistoryMenu(route: RouteLocationNormalized) {
      if (!route.meta?.menu) return;
      this.route = route;
      const menu: IMenu = { ...route.meta.menu, route: route.name as string };
      const isHas = this.historyMenu.some((menu) => menu.route == route.name);
      if (!isHas) this.historyMenu.unshift(menu);
      if (this.historyMenu.length > 10) {
        this.historyMenu.pop();
      }
      utils.store.set(CacheEnum.HISROTY_MENU, this.historyMenu);
    },
    getMenuByRoutes() {
      this.menus = router
        .getRoutes()
        .filter((route) => route.children.length && route.meta.menu)
        .map((route) => {
          let menu: IMenu = { ...route.meta.menu };
          menu.children = route.children
            .filter((route) => route.meta?.menu)
            .map((route) => {
              return { ...route.meta?.menu, route: route.name };
            }) as IMenu[];
          return menu;
        })
        .filter((menu) => menu.children?.length);
    },
  },
});
