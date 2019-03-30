export default {
  path: '/planet-generator',
  name: 'planet-generator',
  component: () => import(/* webpackChunkName: "PagePlanetGenerator" */ './PlanetGenerator'),
  meta: {
    title: 'Planet Generator',
    layout: 'standard',
  },
};
