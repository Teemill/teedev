import { RouteConfig } from 'vue-router';

export default {
  path: 'formula-e/',
  component: () => import(/* webpackChunkName: "ViewGbroHome" */ './FormulaE.vue'),
} as RouteConfig;
