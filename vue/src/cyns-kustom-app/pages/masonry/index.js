export default {
  path: '/masonry/',
  name: 'Masonry',
  component: () => import(/* webpackChunkName: "PageMasonry" */ './Masonry'),
  meta: {
    layout: 'standard',
  },
};
