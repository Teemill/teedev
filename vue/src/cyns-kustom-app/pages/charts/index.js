export default {
  path: '/charts',
  name: 'TeeDev Charts',
  component: () => import(/* webpackChunkName: "PageCharts" */ './Charts'),
  meta: {
    title: 'Charts',
    layout: 'standard',
  },
};
