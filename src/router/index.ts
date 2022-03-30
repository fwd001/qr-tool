import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import routes from './routes';
import { mitter } from '@/common/event-bus';
import { store } from '@/store';
import { message } from 'ant-design-vue';

// 此处由【new VueRouter】的方式修改为【createRouter】的方式 其余无变化
export const router = createRouter({
  history: createWebHashHistory(), //路由模式的配置采用API调用的方式 不再是之前的字符串 此处采用的hash路由
  routes: [...routes],
});

// 检查权限
const checkRoutePower = (to: RouteLocationNormalized) => {};

// 权限守卫
router.beforeEach((to) => checkRoutePower(to));
