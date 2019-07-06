export default {
  path: '/settings/',
  name: 'settings',
  component: () => import(/* webpackChunkName: "PageSettings" */ './Settings'),
  meta: {
    title: 'Settings',
    layout: 'standard',
  },
};
