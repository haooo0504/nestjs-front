import type { App } from "vue";
import { setupTailwindcss } from "./tailwindcss";
import _ from "lodash";
import setupElementui from "./elementui";
import setupPinia from "./pinia";

export function setupPlugins(app: App) {
  autoRegisterComponent(app);
  setupTailwindcss();
  setupElementui(app);
  setupPinia(app);
}

function autoRegisterComponent(app: App) {
  const components = import.meta.globEager("../components/form/*.vue");
  Object.keys(components).forEach((key) => {
    const name = key.split("/").pop()?.split(".").shift() as string;
    app.component(_.camelCase(name), components[key].default);
  });
}
