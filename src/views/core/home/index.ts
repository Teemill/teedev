import { RouteConfig } from 'vue-router';

export default {
  path: '/',
  component: () => import(/* webpackChunkName: "ViewHome" */ './Home.vue'),
} as RouteConfig;
