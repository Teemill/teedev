export default {
  path: '/',
  name: 'TeeDev Home',
  component: () => import(/* webpackChunkName: "PageHome" */ './Home'),
  meta: {
    title: 'Home',
    layout: 'standard',
  },
};
