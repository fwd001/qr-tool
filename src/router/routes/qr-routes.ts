const routes = [
  {
    path: '/',
    redirect: '/text2qr',
  },
  {
    path: '/',
    name: 'LayoutMain',
    component: () => import('@/components/layout/layout-main.vue'),
    children: [
      {
        path: 'text2qr',
        name: 'Text2Qr',
        component: () => import('@/views/text2qr/index.vue'),
      },
      {
        path: 'qr2text',
        name: 'Qr2Text',
        component: () => import('@/views/qr2text/index.vue'),
        meta: { title: 'qr2text' },
      },
      {
        path: 'encode',
        name: 'EncodePage',
        component: () => import('@/views/encode/index.vue'),
        meta: { title: 'encode' },
      },
    ],
  },
];

export default routes;
