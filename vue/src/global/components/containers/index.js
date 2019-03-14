export default {
  TabContainer: () => import(/* webpackChunkName: "TeeDevContainers" */ './TabContainer'),
  Tab: () => import(/* webpackChunkName: "TeeDevContainers" */ './Tab'),
  ColumnContainer: () => import(/* webpackChunkName: "TeeDevContainers" */ './ColumnContainer'),
  Column: () => import(/* webpackChunkName: "TeeDevContainers" */ './Column'),
  Grid: () => import(/* webpackChunkName: "TeeDevContainers" */ './Grid'),
  FloatingContainer: () => import(/* webpackChunkName: "TeeDevContainers" */ './FloatingContainer'),
  Box: () => import(/* webpackChunkName: "TeeDevContainers" */ './Box'),
  Tile: () => import(/* webpackChunkName: "TeeDevContainers" */ './Tile'),

  FixedSidebar: () => import(/* webpackChunkName: "TeeDevContainers" */ './FixedSidebar'),
};
