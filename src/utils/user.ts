import userApi, { type ILoginData } from "@/apis/userApi";
import { CacheEnum } from "@/enum/cacheEnum";
import store from "./store";
import util from "./index";
import router from "@/router";
import { remove, result } from "lodash";
import userStore from "../stores/userStore";
import { ElMessage } from "element-plus";

export function isLogin() {
  return Boolean(store.get(CacheEnum.TOKEN_NAME));
}

export async function login(values: ILoginData) {
  const res = await userApi.login(values);
  console.log(res);
  if (res.code == 0) {
    const {
      result: { token },
    } = res;
    util.store.set(CacheEnum.TOKEN_NAME, token);
    const {
      result: { userid, username, createdate, account },
    } = res;
    util.store.set(CacheEnum.USER_INFO, {
      account: account,
      userid: userid,
      username: username,
      createdate: createdate,
    });

    ElMessage({
      message: "登入成功",
      type: "success",
      center: true,
    });
    const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? "home";
    router.push({ name: routeName });
  }
  if (res.code == 3) {
    ElMessage({
      message: "該手機號尚未註冊",
      type: "warning",
      center: true,
    });
  }
  if (res.code == 4) {
    ElMessage({
      message: "密碼輸入錯誤",
      type: "error",
      center: true,
    });
  }
}

export function logout() {
  store.remove(CacheEnum.TOKEN_NAME);
  store.remove(CacheEnum.USER_INFO);
  router.push("/");
  userStore().info = null;
}

export async function register(values: any) {
  const res = await userApi.register(values);
  if (res.code == 0) {
    const {
      result: { token },
    } = res;
    util.store.set(CacheEnum.TOKEN_NAME, token);
    const {
      result: { userid, username, createdate, account },
    } = res;
    util.store.set(CacheEnum.USER_INFO, {
      account: account,
      userid: userid,
      username: username,
      createdate: createdate,
    });
    ElMessage({
      message: "註冊成功",
      type: "success",
      center: true,
    });
    const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? "home";

    router.push({ name: routeName });
  }
  if (res.code == 1) {
    ElMessage({
      message: "當前手機號已註冊",
      type: "warning",
      center: true,
    });
  }
  if (res.code == 4) {
    ElMessage({
      message: "用戶註冊失敗,請聯繫相關人員",
      type: "error",
      center: true,
    });
  }
}
