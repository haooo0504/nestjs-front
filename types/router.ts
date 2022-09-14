import "vue-router";
import type { IMenu } from "./menu";

declare module "vue-router" {
  interface RouteMeta {
    auth?: boolean;
    guest?: boolean;

    permission?: string;
    menu?: IMenu;
  }
}
