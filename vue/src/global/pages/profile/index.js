import guards from '@/global/router/guards';

export default {
  path: '/user/:slug/profile',
  name: 'TeeDev User Profile',
  component: () => import(/* webpackChunkName: "PageProfile" */ './Profile'),
  meta: {
    layout: 'standard',
    guards: [
      guards.loggedIn,
    ],
  },
};
