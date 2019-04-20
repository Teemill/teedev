export default {
  path: '/grid/',
  name: 'Grid',
  component: () => import(/* webpackChunkName: "PageGrid" */ './Grid'),
  meta: {
    layout: 'standard',
  },
};
