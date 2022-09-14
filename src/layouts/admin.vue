<template>
  <div class="admin relative min-h-screen w-screen flex">
    <MenuComponent />

    <div class="contect grid grid-rows-[auto_1fr] w-full bg-gray-100">
      <div>
        <Navbar />
        <historyLink
          class="hidden md:block"
          :class="{ 'md:hidden': !menu.isHistoryCollapse }"
        />
      </div>
      <div class="m-5 relative overflow-auto">
        <router-view #default="{ Component }">
          <Transition
            mode="out-in"
            appear
            class="animate__animated"
            enter-active-class="animate__fadeIn"
            leave-active-class="animate__fadeOut"
          >
            <component :is="Component" class="absolute w-full" />
          </Transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuComponent from "@/components/admin/menu.vue";
import Navbar from "@/components/admin/navbar.vue";
import historyLink from "@/components/admin/historyLink.vue";
import menuStore from "@/stores/menuStore";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { watch } from "vue";
undefined;
const route = useRoute();
const menu = menuStore();
menu.init();
watch(
  route,
  () => {
    menu.addHistoryMenu(route);
  },
  { immediate: true }
);
</script>

<script lang="ts">
export default {
  route: { meta: { auth: true } },
};
</script>

<style lang="scss" scoped>
.animate__fadeIn {
  animation-duration: 0.5s;
}

.animate__fadeOut {
  animation-duration: 0.5s;
}
</style>
