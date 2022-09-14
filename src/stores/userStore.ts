import { defineStore } from "pinia";
import type { User } from "@/apis/userApi";
import userApi from "@/apis/userApi";

export default defineStore({
  id: "user",
  state: () => {
    return {
      info: {} as null | User,
    };
  },
  actions: {
    // async getUserInfo() {
    //   const res = await userApi.info();
    //   this.info = res.result;
    // },
  },
});
