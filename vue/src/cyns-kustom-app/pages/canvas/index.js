export default {
  path: '/canvas',
  name: 'TeeDev Canvas',
  component: () => import(/* webpackChunkName: "PageCanvas" */ './Canvas'),
  meta: {
    title: 'Canvas',
    layout: 'standard',
  },
};
