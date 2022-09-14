<template>
  <div>
    <div class="grid md:grid-flow-col gap-3">
      <el-card
        class="box-card cursor-pointer"
        v-for="(card, index) in cards"
        :key="index"
        shadow="hover"
      >
        <template #header>
          <div class="card-header">
            <span class="flex justify-between items-center"
              >{{ card.title }}
              <el-tag class="ml-2" type="danger" effect="dark" size="small"
                >月</el-tag
              >
            </span>
          </div>
        </template>
        <section class="flex my-3 justify-between items-center">
          <span class="text-3xl">{{ card.price }}</span>
          <i :class="[card.icon]" class="text-2xl"></i>
        </section>
      </el-card>
    </div>
    <div class="mt-5 grid md:grid-cols-2 gap-3">
      <el-card :body-style="{ padding: '20px' }">
        <template #header>
          <div>用戶統計</div>
        </template>
        <div id="echart1" class="w-full h-72"></div>
      </el-card>
      <el-card :body-style="{ padding: '20px' }">
        <template #header>
          <div>用戶統計</div>
        </template>
        <div id="echart2" class="w-full h-80"></div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import { ref } from "vue";
import { echart1, echart2 } from "./echart";
import * as echarts from "echarts";
// import echarts from "echarts";
import util from "@/utils/index";
import { CacheEnum } from "@/enum/cacheEnum";
import { project } from "@/apis/projectApi";

const user = util.store.get(CacheEnum.USER_INFO);

const CreateDate = user.createdate.split(",")[0];
const a = CreateDate.split("/").map((v: any) => {
  return v;
});
const createdate = a[2] + "/" + a[0] + "/" + a[1];

//讀取數據
const list = ref([]) as any;
const day = ref() as any;
onMounted(() => {
  getProjectData();
});
const getProjectData = async () => {
  console.log(user.userid);
  let res = await project(user.userid);
  list.value = res.message;
  return res.message.length;

  // res.message.map((v: any) => {
  //   if (v.date.split(" ")[0].split("/")[1] == curdate[1]) {
  //     month.value.push(v.date.split(" ")[0].split("/")[1]);
  //     console.log(month.value);
  //   }
  //   if (v.date.split(" ")[0].split("/")[2] == curdate[2]) {
  //     day.value = v.date.split(" ")[0].split("/")[2];
  //   }

  //   console.log(day.value);
  // });
};

interface ICard {
  title: string;
  price: number;
  icon: string;
  total: number;
}
const cards = ref<ICard[]>([
  {
    title: "用戶名稱",
    price: user.username,
    icon: "fa-regular fa-user",
    total: 5462444,
  },
  {
    title: "用戶帳號",
    price: user.account,
    icon: "fa-solid fa-calendar",
    total: 215615,
  },
  {
    title: "創建日期",
    price: createdate,
    icon: "fa-solid fa-calendar-days",
    total: 2545314,
  },
  {
    title: "總項目數",
    price: await getProjectData(),
    icon: "fa-solid fa-calendar-week",
    total: 453423,
  },
]);

let echarts1 = {} as echarts.ECharts;
let echarts2 = {} as echarts.ECharts;

onMounted(() => {
  echarts1 = echarts.init(document.getElementById("echart1") as HTMLDivElement);
  echarts1.setOption(echart1);

  echarts2 = echarts.init(document.getElementById("echart2") as HTMLDivElement);
  echarts2.setOption(echart2);
});
onUnmounted(() => {
  echarts1.dispose();
  echarts1.clear();
  echarts1 = null!;
  echarts2.dispose();
  echarts2.clear();
  echarts2 = null!;
});
</script>

<style lang="scss" scoped>
.box-card {
  @apply flex flex-col justify-center rounded-[30px] duration-300 cursor-pointer;
  // box-shadow: 10px 10px 30px #ededed,
  //   -10px -10px 30px #ededed;

  &:hover {
    box-shadow: 10px 10px 30px #8a8a8a, -10px -10px 30px #ececec;

    * {
      color: var(--ft-color);
    }
  }
}
</style>
