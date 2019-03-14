export default {
  path: '/select-theme/',
  name: 'TeeDev Select Theme',
  component: () => import(/* webpackChunkName: "PageSelectTheme" */ './SelectTheme'),
  meta: {
    layout: 'onepager',
  },
};
