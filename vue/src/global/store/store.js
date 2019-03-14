import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

Vuex.Store.prototype.getter = function getter(type) {
  return this.getters[type];
};

export default new Vuex.Store({
  state: {
    initalRoute: false,
  },
  mutations: {
    initialRoute(state, value) {
      state.initalRoute = value;
    },
  },
});
