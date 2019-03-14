export default {
  namespaced: true,
  state: {
    testState: 123,
    otherState: 'test',
  },
  mutations: {
    setTestState(state, value) {
      console.log('Mutate State');
      state.testState = value;
    },
    setOtherState(state, value) {
      console.log('Mutate The Other State');
      state.otherState = value;
    },
  },
  getters: {
    getTestState(state) {
      console.log('Get State');
      return state.testState;
    },
    getTestStateFunc: state => (a) => {
      console.log('Get State Func');
      return `${a}-${state.testState}`;
    },
  },
  actions: {
    setTestState({ commit }, value) {
      console.log('Dispatch State');
      commit('setTestState', value);
      return 'Dispatch State Return';
    },
  },
};

// export default {
//   install(Vue, { router, store }) {
//     Vue.prototype.$teedevForms = this.virtual_slot;

//     console.log(router);
//     console.log(store);

//     store.registerModule(['stateManager'], Store);

//     store.subscribe(({ type, payload }, state) => {
//       console.log('subscribe');
//       console.log(type);
//       console.log(payload);
//       console.log(state);
//     });

//     store.subscribeAction(({ type, payload }, state) => {
//       console.log('subscribeAction');
//       console.log(type);
//       console.log(payload);
//       console.log(state);
//     });
//   },
// };
