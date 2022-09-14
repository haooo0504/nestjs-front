import type { Plugin } from "vite";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export function autoImport(plugins: Plugin[]) {
  plugins.push(
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router"],
      //为true时在项目根目录自动创建
      dts: "types/auto-imports.d.ts",
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ["src/components"],
      directoryAsNamespace: true,
      dts: "types/components.d.ts",
    })
  );
}
