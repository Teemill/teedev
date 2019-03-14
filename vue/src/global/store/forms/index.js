import Vue from 'vue';

export default {
  namespaced: true,
  state: {},
  mutations: {
    registerForm(state, options) {
      Vue.set(state, options.name, {});
    },
    registerField(state, options) {
      Vue.set(
        state[options.formName],
        options.fieldName, {
          value: options.value || null,
          valid: false,
        },
      );
    },
    setFieldValue(state, options) {
      if (state[options.formName][options.fieldName]) {
        state[options.formName][options.fieldName].value = options.value;
      }
    },
  },
  getters: {
    getValue: state => (formName, fieldName) => {
      if (state[formName] && state[formName][fieldName]) {
        return state[formName][fieldName].value;
      }
      return null;
    },
    getValues: state => (formName) => {
      formName.test.test = 123;
      const values = {};
      if (state[formName]) {
        const fieldNames = Object.keys(state[formName]);
        for (let i = 0; i < fieldNames.length; i += 1) {
          const fieldName = fieldNames[i];
          values[fieldName] = state[formName][fieldName].value;
        }
      }
      return values;
    },
  },
};
