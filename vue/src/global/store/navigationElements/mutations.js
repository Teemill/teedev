import Vue from 'vue';
import types from './types';

export default {
  [types.REGISTER_ELEMENT](state, payload) {
    const { navItems } = payload;

    /**
     * if the nav-item has a preselect value of true, set the active nav-item
     * to this item, then delete the preselect value
     */
    navItems.map((item) => {
      /**
     * Make the active property reactive
     */
      Vue.set(item, 'active', !!item.preSelected);
      delete item.preSelected;
      return item;
    });

    Vue.set(state, payload.name, { navItems });
  },

  [types.CHANGE_ACTIVE_NAV_ITEM](state, payload) {
    state[payload.name].navItems[payload.key].active = true;
  },

  [types.DESELECT_ALL](state, name) {
    state[name].navItems.forEach((navItem) => {
      navItem.active = false;
    });
  },
};
