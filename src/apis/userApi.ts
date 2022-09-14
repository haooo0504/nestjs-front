import { http } from "@/plugin/axios";
export interface User {
  name: string;
  age: number;
  avatar: string;
  permissions: string[];
}
// function info() {
//   return http.request<User>({
//     url: `user/info`,
//   });
// }
interface LoginInterface {
  account: string;
  token: string;
  userid: string;
  username: string;
  createdate: string;
}
export interface ILoginData {
  phone: string;
  password: string;
}
export async function login(data: ILoginData) {
  return await http.request<LoginInterface>({
    url: `auth/login`,
    method: "post",
    data,
  });
}

export async function register(data: any) {
  return await http.request<LoginInterface>({
    url: `auth/regist`,
    method: "post",
    data,
  });
}

export default { login, register };
