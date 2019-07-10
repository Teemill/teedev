export default {
  path: '/test/',
  name: 'test',
  component: () => import(/* webpackChunkName: "PageTest" */ './Test'),
  meta: {
    title: 'Test',
    layout: 'standard',
  },
};
