import { RouteConfig } from 'vue-router';

export default {
  path: 'dashboard/',
  component: () => import(/* webpackChunkName: "ViewGbroDashboard" */ './Dashboard.vue'),
} as RouteConfig;
