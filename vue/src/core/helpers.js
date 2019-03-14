/**
 * Core Helper functions
 */

import Vue from 'vue';

window.$ENV = prop => process.env[`VUE_APP_${prop.toUpperCase()}`];

window.ucfirst = string => string.charAt(0).toUpperCase() + string.slice(1);
window.plural = (string, count) => (count > 1 ? `${string}s` : string);

Vue.unuse = (plugin, options) => {
  // eslint-disable-next-line
  const installedPlugins = (Vue._installedPlugins || (Vue._installedPlugins = []));
  const pluginIndex = installedPlugins.indexOf(plugin);

  if (pluginIndex >= 0) {
    delete installedPlugins[pluginIndex];
  }

  if (plugin.uninstall) {
    plugin.uninstall(Vue, options);
  }
};
