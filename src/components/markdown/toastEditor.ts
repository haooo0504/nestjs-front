import { uploadImage } from "@/apis/uploadApi";

export default class {
  editor: toastui.Editor;
  constructor(el: string, initialValue: string, public height: string) {
    this.editor = new toastui.Editor({
      el: document.querySelector(el),
      initialEditType: "markdown",
      previewStyle: "vertical",
      height: height,
      initialValue: initialValue,
      toolbarItems: this.toolbar(),
    });
    this.ImageHook();
    this.toolbar();
  }
  private toolbar() {
    return [
      ["heading", "bold", "italic", "strike"],
      ["hr", "quote"],
      ["ul", "ol", "task", "indent", "outdent"],
      ["table", "image", "link"],
      ["code", "codeblock"],
      // Using Option: Customize the last button
      [
        {
          el: this.fullscreen(),
          command: "fullscreen",
          tooltip: "fullscreen",
        },
      ],
    ];
  }
  private fullscreen() {
    const button = document.createElement("button") as HTMLButtonElement;
    button.innerHTML = "全屏";
    button.style.margin = "0";

    button.addEventListener("click", () => {
      // this.editor.setHeight("100vh");
      const ui = document.querySelector(
        ".toastui-editor-defaultUI"
      ) as HTMLDivElement;
      ui.classList.toggle("fullscreen");
    });
    document.documentElement.addEventListener(
      "keyup",
      (event: KeyboardEvent) => {
        if (event.key == "Escape") {
          const ui = document.querySelector(
            ".toastui-editor-defaultUI"
          ) as HTMLDivElement;
          ui.classList.remove("fullscreen");
          this.editor.focus();
        }
      }
    );
    return button;
  }

  private ImageHook() {
    this.editor.removeHook("addImageBlobHook");
    this.editor.addHook(
      "addImageBlobHook",
      async (blob: any, callback: Function) => {
        const form = new FormData();
        form.append("file", blob, blob.name);

        const response = await uploadImage(form);
        callback(response.result.url, blob.name);
      }
    );
  }
}
