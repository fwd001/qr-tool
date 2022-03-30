import { RouteRecordRaw } from 'vue-router';
// 路由配置 和以前一样
let routes: RouteRecordRaw[] = [];

const modulesFiles = import.meta.globEager('./routes/*.ts'); // vite

for (const key in modulesFiles) {
  if (Object.prototype.hasOwnProperty.call(modulesFiles, key)) {
    const element = modulesFiles[key];
    routes = routes.concat(element.default);
  }
}

export default routes;
