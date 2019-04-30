export default {
  path: '/forms',
  name: 'TeeDev Forms',
  component: () => import(/* webpackChunkName: "PageForms" */ './Forms'),
  meta: {
    title: 'Forms',
    layout: 'standard',
  },
};
