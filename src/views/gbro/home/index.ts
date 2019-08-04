import { RouteConfig } from 'vue-router';

export default {
  path: '/',
  component: () => import(/* webpackChunkName: "ViewGbroHome" */ './Home.vue'),
} as RouteConfig;
