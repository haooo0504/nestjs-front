<template>
  <div>
    <div class="option flex justify-end items-center">
      <el-button @click="dialogVisible = true" style="width: 100px"
        >新增</el-button
      >
      <el-input
        v-model="searchInput"
        placeholder="搜尋標題"
        clearable
        class="ml-5"
        style="width: 180px"
      />
      <el-button @click="getProjectData" style="width: 50px; margin-left: 5px"
        ><i class="fa-solid fa-magnifying-glass"></i
      ></el-button>
    </div>
    <div class="grid md:grid-cols-5 gap-3 mt-5">
      <el-card
        class="box-card cursor-pointer"
        v-for="(list, index) in lists"
        :key="index"
        @click="getlistid(list)"
      >
        <template #header>
          <div class="card-header">
            <span>{{ list.name }}</span>
          </div>
        </template>
        <div class="no-scrollbar h-[120px] overflow-y-scroll">
          <div>
            {{ list.content }}
          </div>
        </div>
      </el-card>

      <el-dialog
        v-model="updatedialog"
        title="更改備忘錄"
        custom-class="dialog"
      >
        <el-form-item label="標題">
          <el-input v-model="UpdateForm.name" placeholder="標題" clearable />
        </el-form-item>
        <el-form-item label="內容">
          <el-input
            v-model="UpdateForm.content"
            placeholder="內容"
            clearable
            type="textarea"
          />
        </el-form-item>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="danger" @click="DelProject">刪除</el-button>
            <el-button @click="updatecancel">Cancel</el-button>
            <el-button type="primary" @click="UpdateProject">Confirm</el-button>
          </span>
        </template>
      </el-dialog>

      <el-dialog
        v-model="dialogVisible"
        title="新增備忘錄"
        custom-class="dialog"
      >
        <el-form-item label="標題">
          <el-input v-model="CreateForm.name" placeholder="標題" clearable />
        </el-form-item>
        <el-form-item label="內容">
          <el-input
            v-model="CreateForm.content"
            placeholder="內容"
            clearable
            type="textarea"
          />
        </el-form-item>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancel">Cancel</el-button>
            <el-button type="primary" @click="AddProject">Confirm</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  project,
  addproject,
  updateproject,
  delproject,
} from "@/apis/projectApi";
import util from "@/utils/index";
import { CacheEnum } from "@/enum/cacheEnum";
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import { Search } from "@element-plus/icons-vue";

//新增資料表單
const dialogVisible = ref(false);
const CreateForm = reactive({
  name: "",
  content: "",
});

const cancel = () => {
  CreateForm.name = "";
  CreateForm.content = "";
  dialogVisible.value = false;
};

//修改資料表單
const updatedialog = ref(false);
const UpdateForm = reactive({
  name: "",
  content: "",
});
const updatecancel = () => {
  UpdateForm.name = "";
  UpdateForm.content = "";
  updatedialog.value = false;
};

//搜索欄內容
const searchInput = ref("");

//獲取當前用戶ID
const userid = util.store.get(CacheEnum.USER_INFO);

//讀取數據
const lists = ref([]) as any;
onMounted(() => {
  getProjectData();
});
const getProjectData = async () => {
  console.log(userid.userid);
  let res = await project(userid.userid);
  if (searchInput.value) {
    res.message = res.message.filter((value: any) => {
      //標題篩選
      let content = value.name.toLowerCase();
      let keyword = searchInput.value.toLowerCase();
      return searchInput.value ? content.indexOf(keyword) != -1 : true;
    });
  }
  if (res.message.length == 0) {
    ElMessageBox.alert("沒有任何資料", "提示", {
      confirmButtonText: "OK",
    });
  }
  lists.value = res.message;
  console.log(res.message);
};

//新增項目
const AddProject = async () => {
  const form = { createrId: userid.userid, ...CreateForm };
  // console.log({ ...CreateForm });
  let res = await addproject(form);
  if (res) {
    getProjectData();
    dialogVisible.value = false;
    ElMessage({
      message: "新增成功",
      type: "success",
      center: true,
    });
  }
  CreateForm.name = "";
  CreateForm.content = "";
};

//更改項目
const list_id = ref();
const list = ref();
const getlistid = (id: any) => {
  updatedialog.value = true;
  list_id.value = id._id;
  list.value = id;
  UpdateForm.name = list.value.name;
  UpdateForm.content = list.value.content;
};
const UpdateProject = async () => {
  let res = await updateproject(list_id.value, { ...UpdateForm });
  if (res) {
    getProjectData();
    updatedialog.value = false;
    ElMessage({
      message: "更改成功",
      type: "success",
      center: true,
    });
  }
  UpdateForm.name = "";
  UpdateForm.content = "";
};

//刪除項目
const DelProject = () => {
  ElMessageBox.confirm("確定要刪除嗎?")
    .then(async () => {
      let res = await delproject(list_id.value);
      if (res) {
        getProjectData();
        updatedialog.value = false;
        ElMessage({
          message: "刪除成功",
          type: "success",
          center: true,
        });
      }

      // done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

<style lang="scss" scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

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

:deep(.dialog) {
  @apply w-11/12 md:max-w-[30%];
}

.option {
  .el-button {
    @apply rounded-[35px] bg-[#ffffff3b];
    border: 1px solid rgba(136, 136, 136, 0.5);
    --el-button-hover-text-color: #ff3131;
  }
  .el-input {
    @apply w-full   rounded-[35px] text-base;
    border: 1px solid rgba(136, 136, 136, 0.5);
    --el-input-bg-color: #ffffff00;
    --el-input-border-color: #ffffff00;
    --el-input-focus-border-color: #ffffff00;
    --el-input-hover-border-color: #ffffff00;
    letter-spacing: 1px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    ::placeholder {
      color: #8a8a8a !important;
    }
  }
}
</style>
