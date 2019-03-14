export default {
  path: '/register/',
  name: 'TeeDev Register',
  component: () => import(/* webpackChunkName: "PageRegister" */ './Register'),
  meta: {
    layout: 'onepager',
  },
};
