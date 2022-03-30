/*
 * @Author: wedong.fu
 * @Date: 2021-12-21 17:12:00
 * @LastEditors: wedong.fu
 * @LastEditTime: 2022-03-30 17:32:23
 * @Description: 请填写简介
 */
/**
 * 配置信息
 */
import { isDev, envVar } from '@/config/env-init';

// api链接配置
// const originApiUrl = `https://eee${envVar}.aaa.work`; // php api地址

export const globalConfig = {
  isDev,
  envVar,
};
