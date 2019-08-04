import { RouteConfig } from 'vue-router';

export default {
  path: 'about',
  component: () => import(/* webpackChunkName: "ViewDevanAbout" */ './About.vue'),
} as RouteConfig;
