export default {
  path: '/charts-old/',
  name: 'TeeDev Charts',
  component: () => import(/* webpackChunkName: "PageCharts" */ './Charts'),
  meta: {
    layout: 'standard',
  },
};
