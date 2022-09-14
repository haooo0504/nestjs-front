import { CacheEnum } from "@/enum/cacheEnum";
import router from "@/router";
import store from "@/utils/store";
import axios, { type AxiosRequestConfig } from "axios";

export default class Axios {
  private instance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors();
  }
  public async request<T, D = ResponseResult<T>>(
    config: AxiosRequestConfig
  ): Promise<D> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<D>(config);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }
  private interceptors() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }
  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      async (config) => {
        // 在发送请求之前做些什么
        config.headers = {
          Authorization: "Bearer " + store.get(CacheEnum.TOKEN_NAME),
        };
        return config;
      },
      (error) => {
        // 对请求错误做些什么
        console.log(444);
        return Promise.reject(error);
      }
    );
  }
  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      (response) => {
        // 对响应数据做点什么
        return response;
      },
      (error) => {
        // 对响应错误做点什么
        switch (error.response.status) {
          case 401:
            store.remove(CacheEnum.TOKEN_NAME);
            router.push({ name: "login" });
            break;
        }
        return Promise.reject(error);
      }
    );
  }
}
