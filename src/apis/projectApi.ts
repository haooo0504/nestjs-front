import { http } from "@/plugin/axios";

export interface Project {
  id?: string;
  name: string;
  date?: string;
  createrId: string;
}

export interface IUserId {
  userid: string;
}

export interface IProjectId {
  projectid: string;
}

export interface IProjectRes {
  code: string;
  message: any;
}

export async function project(data: IUserId) {
  return await http.request<any>({
    url: `project/project/${data}`,
    method: "get",
    data,
  });
}

export async function updateproject(projectid: any, data: any) {
  console.log(data);
  return await http.request<IProjectRes>({
    url: `project/alter/${projectid}`,
    method: "post",
    data,
  });
}

export async function addproject(data: Project) {
  return await http.request<any>({
    url: `project/create`,
    method: "post",
    data,
  });
}

export async function delproject(projectid: any) {
  return await http.request<any>({
    url: `project/delete/${projectid}`,
    method: "post",
  });
}
