import Vue from 'vue';
import { BaseLoader } from '.';

const load = (item) => {
  Vue.component(`Teedev${item.name}`, item.module);
};

const unload = (item) => {
  delete Vue.options.components[`Teedev${item.name}`];
};

const get = (item) => {
  const components = [];

  const itemComponents = item.module.default;
  Object.keys(itemComponents).forEach((componentName) => {
    const itemComponent = itemComponents[componentName];

    const component = item.copy();
    component.module = itemComponent;
    component.name = componentName;
    component.group = item.name;

    components.push(component);
  });

  return components;
};

export default new BaseLoader(
  'component',
  load,
  unload,
  get,
);
