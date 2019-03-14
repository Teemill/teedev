import guards from './guards';

import Home from '@/global/pages/home/Home.vue';
import Components from '@/global/pages/components/Components.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      layout: 'standard',
      guards: [
        guards.loggedIn,
      ],
    },
  },
  {
    path: '/components/',
    name: 'Components',
    component: Components,
    meta: {
      layout: 'standard',
    },
  },
  {
    path: '/about/',
    name: 'about',
    component: () => import(/* webpackChunkName: "PageAbout" */ '@/global/pages/about/About'),
    meta: {
      layout: 'standard',
    },
  },
  {
    path: '*',
    redirect: '/404/',
  },
  // {
  //   path: '/login/',
  //   name: 'Login',
  //   component: () => import(/* webpackChunkName: "PageLogin" */ './pages/login/Login'),
  //   meta: {
  //     layout: 'onepager',
  //   },
  // },
];
