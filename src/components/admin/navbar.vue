<template>
  <div class="bg-white p-4 flex justify-between items-center">
    <div class="flex items-center">
      <div @click="menus.toggleState()">
        <!-- <section v-if="menus.close">
          <i class="fas fa-angles-right mr-2 cursor-pointer"></i>
        </section>
        <section v-else>
          <i class="fas fa-angles-left mr-2 cursor-pointer"></i>
        </section> -->

        <section
          :class="{ 'rotate-180': menus.close }"
          class="mr-2 cursor-pointer"
        >
          <i class="fas fa-angles-left duration-300"></i>
        </section>
      </div>
      <Breadcrumb class="hidden md:block" />
    </div>

    <div class="flex items-center relative">
      <Notification class="mr-5" />
      <section @click="fullscreen()" class="flex mr-5">
        <i class="fa-solid fa-expand cursor-pointer text-xl text-gray-600"></i>
      </section>
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="fa-regular fa-user text-xl text-gray-600"></i>
          {{ useStore.info?.name }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <i class="fas fa-paste mr-1" /> 文檔資料</el-dropdown-item
            >
            <el-dropdown-item>
              <i class="fas fa-house-user mr-1" />用戶管理</el-dropdown-item
            >
            <el-dropdown-item divided @click="util.user.logout()">
              <i class="fas fa-sign-out-alt mr-1" />退出登入</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import user from "@/stores/userStore";
import { ArrowDown } from "@element-plus/icons-vue";
import util from "@/utils";
import menuStore from "@/stores/menuStore";
import { storeToRefs } from "pinia";
import Notification from "../notification.vue";
import Breadcrumb from "../breadcrumb.vue";

const menus = menuStore();
const menu = storeToRefs(menus);

const useStore = user();
let isFullScreen = false;
const fullscreen = () => {
  isFullScreen
    ? document.exitFullscreen()
    : document.documentElement.requestFullscreen();
  isFullScreen = !isFullScreen;
};
</script>

<style lang="scss" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
