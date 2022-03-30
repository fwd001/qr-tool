import { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';

// 补充 axios config 参数
export interface IAxiosConfig extends AxiosRequestConfig {
  manual?: boolean;
}
// 重写 axios 实例接口
export interface IAxios extends AxiosInstance {
  (config: IAxiosConfig): AxiosPromise;
}
