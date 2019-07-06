export default {
  path: '/',
  name: 'home',
  component: () => import(/* webpackChunkName: "PageHome" */ './Home'),
  meta: {
    title: 'Home',
    layout: 'standard',
  },
};
