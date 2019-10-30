import { RouteConfig } from 'vue-router';

export default {
  path: '/grid',
  component: () => import(/* webpackChunkName: "ViewDevanMasonryGrid" */ './Grid.vue'),
} as RouteConfig;
