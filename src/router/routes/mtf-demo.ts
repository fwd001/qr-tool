const routes = [
  {
    path: '/mtf',
    name: 'MtfHome',
    component: () => import('@/views/mtf/index.vue'),
    meta: { title: 'mtf-home' },
  },
  {
    path: '/mtf-basic',
    name: 'MtfBasic',
    component: () => import('@/views/mtf/basic.vue'),
    meta: { title: 'mtf-basic' },
  },
  {
    path: '/mtf-cool-feedbacks',
    name: 'MtfCoolFeedbacks',
    component: () => import('@/views/mtf/cool-feedbacks.vue'),
    meta: { title: 'mtf-cool-feedbacks' },
  },
  {
    path: '/mtf-delay-test',
    name: 'MtfDelayTest',
    component: () => import('@/views/mtf/delay-test.vue'),
    meta: { title: 'mtf-delay-test' },
  },
  {
    path: '/mtf-sibling',
    name: 'MtfSibling',
    component: () => import('@/views/mtf/sibling.vue'),
    meta: { title: 'mtf-sibling' },
  },
  {
    path: '/mtf-demo-list',
    name: 'mtfDemoList',
    component: () => import('@/views/mtf/demo/list.vue'),
    meta: { title: 'mtf-demo-list' },
  },
  {
    path: '/mtf-demo-list-detail',
    name: 'mtfDemoListDetail',
    component: () => import('@/views/mtf/demo/list-detail.vue'),
    meta: { title: 'mtf-demo-list-detail' },
  },
];

export default routes;
