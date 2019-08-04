import { RouteConfig } from 'vue-router';

export default {
  path: '/404',
  component: () => import(/* webpackChunkName: "View404" */ './404.vue'),
} as RouteConfig;
