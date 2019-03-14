export default {
  path: '/404/',
  name: '404',
  component: () => import(/* webpackChunkName: "Page404" */ './404'),
  meta: {
    layout: 'standard',
  },
};
