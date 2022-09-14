<template>
  <div id="editor"></div>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import ToastEditor from "./toastEditor";

interface IProps {
  modelValue?: string;
  height?: number;
  placeholder?: string;
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: "",
  height: 500,
  placeholder: "",
});

const emit = defineEmits(["update:modelValue"]);

nextTick(() => {
  const toastUi = new ToastEditor(
    "#editor",
    `${props.modelValue}`,
    `${props.height}px`
  );
  toastUi.editor.on("change", (type: string) => {
    const content =
      type == "markdown"
        ? toastUi.editor.getMarkdown()
        : toastUi.editor.getHTML();
    emit("update:modelValue", content);
  });
});
</script>

<style lang="scss" scoped>
// @import "https://uicdn.toast.com/editor/latest/toastui-editor.min.css";

#editor {
  @apply bg-white;
  :deep(.toastui-editor-mode-switch) {
    display: none !important;
  }
  :deep(.fullscreen) {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgb(121, 67, 67);
  }
}
</style>
