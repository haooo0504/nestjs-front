<template>
  <div class="admin-menu" :class="{ close: menu.close }">
    <div class="menu w-[200px] bg-gray-700">
      <div class="logo">
        <i class="fa-solid fa-earth-americas text-[30px]"></i>
        <span class="aaa text-md ml-2">hello</span>
      </div>
      <div class="left-container">
        <dl></dl>
        <dl v-for="(menus, index) of menu.menus" :key="index">
          <dt @click="handle(menus)">
            <section>
              <i :class="menus.icon" class="text-2xl"></i>
              <span class="text-md ml-2">{{ menus.title }}</span>
            </section>
            <section :class="{ 'rotate-180': menus.isClick }">
              <i class="fas fa-angle-down duration-300"></i>
            </section>
          </dt>
          <dd v-show="menus.isClick || refmenu.close.value">
            <div
              :class="{ active: cmenu?.isClick }"
              v-for="(cmenu, key) of menus?.children"
              :key="key"
              @click="handle(menus, cmenu)"
            >
              {{ cmenu?.title }}
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <div class="bg block md:hidden" @click="menu.toggleState()"></div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

import menuStore from "@/stores/menuStore";
import { watch } from "vue";
import type { IMenu } from "types/menu";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const menu = menuStore();
const refmenu = storeToRefs(menu);
const route = useRoute();
watch(route, () => menu.setCurrentMenu(route), { immediate: true });

const handle = (pmenu: IMenu, cmenu?: IMenu) => {
  // reset();
  pmenu.isClick = !pmenu.isClick;
  if (cmenu) {
    cmenu.isClick = true;
    router.push({ name: cmenu.route });
  }
};
</script>

<style lang="scss" scoped>
.admin-menu {
  .menu {
    @apply h-full;
    .logo {
      @apply text-gray-300 flex items-center p-4;
    }
    .left-container {
      dl {
        @apply text-gray-100 text-sm relative;
        dt {
          @apply text-sm p-4 flex justify-between cursor-pointer items-center;
          section {
            @apply flex items-center;
          }
        }
        dd {
          div {
            @apply py-3 pl-4 m-2  text-white rounded-md cursor-pointer hover:bg-amber-500 duration-200;
            &.active {
              @apply bg-amber-600 hover:bg-amber-500 duration-200;
            }
          }
        }
      }
    }
  }
}

@media screen and(min-width:768px) {
  .admin-menu {
    &.close {
      .menu {
        width: auto;

        .logo {
          @apply flex justify-center;

          span {
            @apply hidden;
          }
        }
        .left-container {
          dl {
            @apply relative;
            dt {
              @apply flex justify-center;
              section {
                span {
                  @apply hidden;
                }
                &:nth-of-type(2) {
                  @apply hidden;
                }
              }
            }
            dd {
              div {
                @apply hidden;
              }
            }

            &:hover {
              dd {
                display: block !important;
                @apply block absolute left-full z-50 top-0 w-[200px] bg-gray-700;
                div {
                  display: block !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
@media screen and(max-width:768px) {
  .admin-menu {
    @apply h-screen w-[200px] absolute left-0 top-0 z-50;
    .menu {
      @apply h-full z-50 absolute;
      .close {
      }
    }
    .bg {
      @apply bg-gray-100 z-40 opacity-75 w-screen h-screen absolute left-0 top-0;
    }
    &.close {
      @apply hidden;
    }
  }
}
</style>
