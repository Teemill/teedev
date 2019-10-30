import Vue from 'vue';
import Router from 'vue-router';
import { EsModuleComponent } from 'vue/types/options';
import { RouteConfig } from 'vue-router';

Vue.use(Router);

const routes: RouteConfig[] = [];

const workspaceRoutes = require.context('./workspaces', true, /^\.\/([\w-_]+)\/views\/([\w-_]+)\/index\.(ts|js)$/);
const coreRoutes      = require.context('./views',      true, /^\.\/([\w-_]+)\/index\.(ts|js)$/);

workspaceRoutes.keys().forEach((dir) => {
  const route: RouteConfig = workspaceRoutes(dir).default;

  const workspaceName = dir.match(/\.\/([\w-_]+)/)![1];
  const parentRoute   = routes.find(r => r.name === workspaceName);

  if (parentRoute) {
    if (!parentRoute.children) {
      parentRoute.children = [];
    }

    parentRoute.children.push(route);
  } else {
    routes.push({
      name: workspaceName,
      path: `/${workspaceName}`,
      component: () => import(/* webpackChunkName: "shell" */ '@/components/shell/Workspace.vue'),
      children: [route], 
    } as RouteConfig);
  }
});

coreRoutes.keys().forEach((dir) => {
  const route: RouteConfig = coreRoutes(dir).default;

  routes.push(route);
});

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...routes,
    {
      path: '*',
      component: () => import(/* webpackChunkName: "view404" */ '@/views/404/404.vue'),
    },
  ],
});
