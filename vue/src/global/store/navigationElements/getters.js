export default {
  /**
   * Find the index of the nav-item, where the active property is true
   * (for non-routerMode)
   */
  activeTab: state => name => state[name].navItems.findIndex(item => item.active === true),

  /**
   * Find the index of the nav-item, where the nav-item href matches the passed
   * href
   */
  activeRouterTab: state => (name, path) => (
    state[name].navItems.findIndex(item => item.href === path)
  ),
};
