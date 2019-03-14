export default {
  path: '/docs/:category?/:section?/',
  name: 'TeeDev Docs',
  component: () => import(/* webpackChunkName: "PageDocs" */ './Docs'),
  meta: {
    layout: 'standard',
  },
};
