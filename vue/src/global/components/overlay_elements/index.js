export default {
  Sidebar: () => import(/* webpackChunkName: "TeeDevGlobal" */ './Sidebar'),
  Popup: () => import(/* webpackChunkName: "TeeDevPopup" */ './Popup'),
  Drawer: () => import(/* webpackChunkName: "TeeDevDrawer" */ './Drawer'),
};
