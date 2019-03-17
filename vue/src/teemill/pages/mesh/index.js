export default {
  path: '/mesh/',
  name: 'Canvas Mesh',
  component: () => import(/* webpackChunkName: "PageMesh" */ './Mesh'),
  meta: {
    title: 'Mesh',
    layout: 'standard',
  },
};
