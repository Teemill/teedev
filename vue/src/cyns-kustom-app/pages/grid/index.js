export default {
  path: '/grid/',
  name: 'TeeDev Grid',
  component: () => import(/* webpackChunkName: "PageGrid" */ './Grid'),
  meta: {
    title: 'Grid',
    layout: 'standard',
  },
};
