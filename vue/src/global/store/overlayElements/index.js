import Vue from 'vue';

export default {
  namespaced: true,
  state: {},
  mutations: {
    add(state, options) {
      if (!state[options.group]) {
        Vue.set(state, options.group, {});
      }
      Vue.set(state[options.group], options.name, false);
    },
    remove(state, options) {
      delete state[options.group][options.name];
    },
    open(state, options) {
      state[options.group][options.name] = true;
    },
    close(state, options) {
      state[options.group][options.name] = false;
    },
    toggle(state, options) {
      state[options.group][options.name] = !state[options.group][options.name];
    },
    setState(state, options) {
      state[options.group][options.name] = options.open;
    },
  },
  getters: {
    getState: state => (group, name) => state[group][name],
    openInGroup: state => (group) => {
      if (state[group]) {
        const keys = Object.keys(state[group]);
        for (let i = 0; i < keys.length; i += 1) {
          const element = state[group][keys[i]];
          if (element) {
            return true;
          }
        }
      }
      return false;
    },
  },
};
