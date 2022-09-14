<template>
  <div class="notification">
    <section @click.stop="show = !show" class="flex text-gray-600">
      <i class="fa-regular fa-bell text-xl cursor-pointer"></i>
    </section>
    <el-tabs v-model="activeName" class="lists" v-show="show" @click.stop>
      <el-tab-pane label="系統消息" name="site">
        <a href="">消息一</a>
        <a href="">消息二</a>
        <a href="">消息三</a>
      </el-tab-pane>
      <el-tab-pane label="站內通知" name="message">Config</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import { ref } from "vue";

const activeName = ref("site");
const show = ref(false);
nextTick(() => {
  document.documentElement.addEventListener("click", () => {
    show.value = false;
  });
});
</script>

<style lang="scss" scoped>
.notification {
  @apply relative z-40;
  .lists {
    @apply absolute bg-white w-[300px] px-5 py-2 rounded-md shadow-md border-2 right-[-20px];
    a {
      @apply truncate overflow-hidden block border-b pb-2 my-2 hover:text-orange-500;
    }
  }
}
</style>
