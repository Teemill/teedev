export default {
  path: '/blog/',
  name: 'blog',
  component: () => import(/* webpackChunkName: "PageBlog" */ './Blog'),
  meta: {
    title: 'Blog',
    layout: 'standard',
  },
};
