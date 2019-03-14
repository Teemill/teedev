export default {
  path: '/render',
  name: 'TeeDev Renderables',
  component: () => import(/* webpackChunkName: "PageRenderables" */ './Renderables'),
  meta: {
    title: 'Renderables',
    layout: 'standard',
  },
};
