import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    slotGroups: {},
  },
  mutations: {
    addSlot(state, options) {
      if (!state.slotGroups[options.slotGroup]) {
        Vue.set(state.slotGroups, options.slotGroup, {});
      }
      Vue.set(state.slotGroups[options.slotGroup], options.slotId, options.slotRef);
    },
    removeSlot(state, options) {
      delete state.slotGroups[options.slotGroup][options.slotId];
    },
  },
};
