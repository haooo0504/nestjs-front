import store from "@/utils/store";
import type { RouteLocationNormalized, Router } from "vue-router";
import type { IData } from "@/utils/store";
import user from "@/stores/userStore";
import { CacheEnum } from "@/enum/cacheEnum";
import utils from "@/utils";
import menuStore from "@/stores/menuStore";
class Guard {
  constructor(private router: Router) {}
  public run() {
    this.router.beforeEach(this.beforeEach.bind(this));
  }
  private beforeEach(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized
  ) {
    // if (this.isLogin(to) === false) return { name: "login" };
    // if (this.isGuest(to) === false) return from;
    if (to.meta.auth && !this.token()) return { name: "login" };
    if (to.meta.guest && this.token()) return from;
  }

  private token(): string | null {
    return store.get(CacheEnum.TOKEN_NAME);
  }

  // private isGuest(route: RouteLocationNormalized) {
  //   return Boolean(!route.meta.guest || (route.meta.guest && !this.token()));
  // }
  // private isLogin(route: RouteLocationNormalized) {
  //   const state = Boolean(
  //     !route.meta.auth || (route.meta.auth && this.token())
  //   );
  //   if (state === false) {
  //     utils.store.set(CacheEnum.REDIRECT_ROUTE_NAME, route.name);
  //   }
  //   return state;
  // }
}

export default (router: Router) => {
  new Guard(router).run();
};
