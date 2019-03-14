import guards from '@/global/router/guards';

export default {
  path: '/login/',
  name: 'TeeDev Login',
  component: () => import(/* webpackChunkName: "PageLogin" */ './Login'),
  meta: {
    layout: 'onepager',
    guards: [
      guards.loggedOut,
    ],
  },
};
