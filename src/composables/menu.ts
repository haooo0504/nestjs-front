import { ref } from "vue";
import type { IMenu } from "types/menu";
import router from "@/router";
import utils from "@/utils";
import { CacheEnum } from "@/enum/cacheEnum";
class Menu {
  public menus = ref<IMenu[]>([]);
  public history = ref<IMenu[]>([]);

  constructor() {
    // this.menus.value = this.getMenuByRoutes();
    this.history.value = utils.store.get(CacheEnum.HISROTY_MENU) ?? [];
  }

  getMenuByRoutes() {
    return router
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
  }
}

export default new Menu();
