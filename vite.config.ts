import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv } from "vite";
import alias from "./vite/alias";
import { parseEnv } from "./vite/util";
import setupPlugins from "./vite/plugins";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias,
//   }
// })

export default ({ command, mode }: ConfigEnv) => {
  const isBuild = command == "build";
  const root = process.cwd();
  const env = parseEnv(loadEnv(mode, root));
  return {
    plugins: [...setupPlugins(isBuild, env), visualizer()],
    server: {
      port: 8090,
      proxy: {
        "/api": {
          target: "https://nestjs-now-pi.vercel.app",
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias,
    },
  };
};
