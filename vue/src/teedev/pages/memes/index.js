export default {
  path: '/memes/',
  name: 'memes',
  component: () => import(/* webpackChunkName: "PageMemes" */ './Memes'),
  meta: {
    title: 'Memes',
    layout: 'standard',
  },
};
