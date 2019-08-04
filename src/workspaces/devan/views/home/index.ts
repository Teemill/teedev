import { RouteConfig } from 'vue-router';

export default {
  path: '/',
  component: () => import(/* webpackChunkName: "ViewDevanHome" */ './Home.vue'),
} as RouteConfig;
