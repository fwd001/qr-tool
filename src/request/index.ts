/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';
import { message } from 'ant-design-vue';
import { ContentTypeEnum } from '@/enums/httpEnum';
import { createSu } from './common';
import qs from 'qs';
import { store } from '@/store';
import type { IAxios } from '@/types/axios';
import { parseResponse } from '@/common';

function createAxios(): IAxios {
  //创建axios实例
  const instance = Axios.create({
    timeout: 10000, // 超时
    withCredentials: true, // 允许携带cookie
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    // 转换请求头
    transformRequest: [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data: any, header: any) => {
        if (header['Content-Type'] === ContentTypeEnum.FORM_DATA) {
          return data;
        }
        if (header['Content-Type'] === ContentTypeEnum.FORM_URLENCODED) {
          return qs.stringify(data);
        }
        return JSON.stringify(data);
      },
    ],
  });
  // 添加请求拦截器
  instance.interceptors.request.use(
    (config: any) => {
      const su = createSu();
      // 给所有接口统一添加时间戳
      if (config.url.includes('?')) {
        config.url += '&_su=' + su;
      } else {
        config.url += '?_su=' + su;
      }
      config.headers['token'] = store.getters['user/getToken']; // 设置identify到公共header
      // id重构前端处理长整型数据：以text格式接收数据，在响应拦截里面进一步处理
      if (!config.responseType || config.responseType === 'json') {
        config.responseType = 'text';
      }
      return config;
    },
    (error: any) => {
      console.log(error);
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: any) => {
      // ID重构 长整形转为字符串
      if (response.config.responseType === 'text') {
        response.data = parseResponse(response.data);
      }
      switch (response.data.ret) {
        case 0:
        case '0':
          return response;
        // 其他错误
        default:
          if (!response.config.manual) {
            message.error(response.data.msg || '服务异常，请稍后再试~');
          }
          return Promise.reject({
            error: response,
            type: 1,
          });
      }
    },
    (error: any) => {
      // 对响应错误做点什么
      if (!error.config.manual) {
        message.error('网络或服务器异常，请稍后重试!');
      }
      return Promise.reject({
        error: error,
        type: 2,
      });
    }
  );
  return instance;
}

export const request = createAxios();
