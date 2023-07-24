const routes = [
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/me'),
    meta: { title: 'mine', tabbar: true },
  },
];

export default routes;
