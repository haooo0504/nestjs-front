import "@wangeditor/editor/dist/css/style.css";
import { createEditor, createToolbar } from "@wangeditor/editor";
import type {
  IEditorConfig,
  IDomEditor,
  IToolbarConfig,
} from "@wangeditor/editor";
type InsertFnType = (url: string, alt: string, href: string) => void;

export default class {
  constructor(
    config: { [key: string]: any },
    callback: (editor: IDomEditor) => void
  ) {
    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {};
    editorConfig.placeholder = "請输入内容";
    editorConfig.onChange = callback;

    // (editor: IDomEditor) => {
    //   // 当编辑器选区、内容变化时，即触发
    //   console.log("content", editor.children);
    //   console.log("html", editor.getHtml());
    // };

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {};

    // 创建编辑器
    const editor = createEditor({
      selector: "#editor-container",
      config: editorConfig,
      mode: "default", // 或 'simple' 参考下文
    });

    // 创建工具栏
    const toolbar = createToolbar({
      editor,
      selector: "#toolbar-container",
      config: toolbarConfig,
      mode: "default", // 或 'simple' 参考下文
    });
  }

  // 执行 createEditor
}
