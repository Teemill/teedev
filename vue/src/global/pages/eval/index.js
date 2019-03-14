export default {
  path: '/eval/',
  name: 'TeeDev Eval',
  component: () => import(/* webpackChunkName: "PageEval" */ './Eval'),
  meta: {
    layout: 'standard',
  },
};
