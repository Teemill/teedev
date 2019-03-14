import types from './types';

export default {
  async register({ commit }, payload) {
    await commit(types.REGISTER_ELEMENT, payload);
  },

  async changeActive({ commit }, payload) {
    commit(types.DESELECT_ALL, payload.name);
    commit(types.CHANGE_ACTIVE_NAV_ITEM, payload);
  },
};
