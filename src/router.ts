import Vue from 'vue';
import Router from 'vue-router';
import { EsModuleComponent } from 'vue/types/options';
import { RouteConfig } from 'vue-router';

Vue.use(Router);

const routes: RouteConfig[] = [];
const workspaceRoutes = require.context('./views', true, /\.(?:\/[\w-_]+){2}\/index\.(?:ts|js)$/);

workspaceRoutes.keys().forEach((dir) => {
  const route: RouteConfig = workspaceRoutes(dir).default;
  const workspaceName = dir.match(/\.\/([\w-_]+)/)![1];

  if (workspaceName === 'core') {
    routes.push(route);
  } else {
    const parentRoute = routes.find(r => r.name === workspaceName);

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
  }
});

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...routes,
    {
    },
  ],
});
