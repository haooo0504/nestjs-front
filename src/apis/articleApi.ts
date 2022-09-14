import { http } from "@/plugin/axios";
export interface Article {
  id: number;
  title: string;
}
export function article() {
  return http.request<Article>({
    url: `article`,
  });
}
