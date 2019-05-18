const test = {};

export default test;

export const installer = (Vue) => {
  Vue.prototype.$test = test;
};
