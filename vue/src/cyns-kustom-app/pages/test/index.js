export default {
  path: '/test',
  name: 'TeeDev Test',
  component: () => import(/* webpackChunkName: "PageTest" */ './Test'),
  meta: {
    title: 'Test',
    layout: 'standard',
  },
};
