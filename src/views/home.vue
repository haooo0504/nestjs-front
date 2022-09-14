<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <img
      src="/public/image/home.jpg"
      class="absolute flex h-full w-full object-cover -z-50"
    />
    <div>
      <router-link
        :to="{ name: 'admin.home' }"
        class="button !bg-[#508064] hover:!bg-[#6fb68d]"
        >後臺管理</router-link
      >
      <router-link
        v-if="!utils.user.isLogin()"
        :to="{ name: 'login' }"
        class="button ml-5 !bg-[#505c80] hover:!bg-[#6d7daf]"
        >用戶登入</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import utils from "@/utils";
</script>

<style scoped></style>

<!-- <script lang="ts">
// export default {
//   route: { name: "home" },
// };
</script> -->
