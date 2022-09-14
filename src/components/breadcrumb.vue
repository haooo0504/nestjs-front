<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <template v-if="route">
        <el-breadcrumb-item
          :to="{ path: r.path }"
          v-for="(r, index) of route.matched"
          :key="index"
          >{{ r.meta.menu?.title }}</el-breadcrumb-item
        >
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import menuStore from "@/stores/menuStore";
const menu = menuStore();
const route = menu.route;
</script>

<style lang="scss" scoped></style>
