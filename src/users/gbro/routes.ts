export default [
  {
    path: 'swag',
    name: 'demo',
    component: () => import(/* webpackChunkName: "about" */ './views/Demo.vue'),
  },
];
