export default [
  {
    path: 'swag',
    name: 'demo',
    component: () => import(/* webpackChunkName: "about" */ './pages/Demo.vue'),
  },
];
