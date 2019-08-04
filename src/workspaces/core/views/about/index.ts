import { RouteConfig } from 'vue-router';

export default {
  path: '/about',
  component: () => import(/* webpackChunkName: "ViewAbout" */ './About.vue'),
} as RouteConfig;
