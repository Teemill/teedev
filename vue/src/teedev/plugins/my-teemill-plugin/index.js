import Vue from 'vue';

export default {
  run(context, scope) {
    const components = this.get(context);
    this.load(components, scope);

    return components;
  },

  load(components, scope) {
    if (components) {
      let componentsLoaded = 0;

      Object.keys(components).forEach((componentName) => {
        componentsLoaded += 1;

        Vue.component(`Teedev${componentName}`, components[componentName]);
      });

      // eslint-disable-next-line
      console.log(vc.green('Component Loader').dark(`loaded ${componentsLoaded} components`).green(`in ${scope} scope`));
    }
  },

  unload(components) {
    if (components) {
      let componentsUnloaded = 0;

      Object.keys(components).forEach((componentName) => {
        componentsUnloaded += 1;
        delete Vue.options.components[`Teedev${componentName}`];
      });

      // eslint-disable-next-line
      console.log(vc.orange('Component Unloader').dark(`unloaded ${componentsUnloaded} components`));
    }
  },

  get(context, scopeName) {
    const components = {};

    context.keys().forEach((fileName) => {
      const match = fileName.match(/(?:\/components|\.)\/([^/]+)\/index\.js$$/);
      if (match) {
        // const componentGroupName = match[1];
        const componentGroup = context(fileName).default;

        if (componentGroup) {
          Object.keys(componentGroup).forEach((componentName) => {
            let scope = components;

            if (scopeName) {
              const computedScope = `scope_${scopeName({ componentGroup, fileName })}`;

              if (typeof components[computedScope] === 'undefined') {
                components[computedScope] = {};
              }

              scope = components[computedScope];
            }

            if (typeof scope[componentName] === 'undefined') {
              scope[componentName] = componentGroup[componentName];
            } else {
              // eslint-disable-next-line
              console.log(vc.red('Component Loader').dark(`${componentName} is already defined in ${fileName}`));
            }
          });
        } else {
          // eslint-disable-next-line
          console.log(vc.red('Component Loader').dark(`Empty _components file found in ${fileName}`));
        }
      }
    });

    return components;
  },

  get2(context, scopeName) {
    const components = {};

    context.keys().forEach((fileName) => {
      const match = fileName.match(/(?:\/components|\.)\/([^/]+)\/index\.js$$/);
      if (match) {
        // const componentGroupName = match[1];
        const componentGroup = context(fileName).default;

        if (componentGroup) {
          Object.keys(componentGroup).forEach((componentName) => {
            let scope = components;

            if (scopeName) {
              const computedScope = `scope_${scopeName({ componentGroup, fileName })}`;

              if (typeof components[computedScope] === 'undefined') {
                components[computedScope] = {};
              }

              scope = components[computedScope];
            }

            if (typeof scope[componentName] === 'undefined') {
              scope[componentName] = componentGroup[componentName];
            } else {
              // eslint-disable-next-line
              console.log(vc.red('Component Loader').dark(`${componentName} is already defined in ${fileName}`));
            }
          });
        } else {
          // eslint-disable-next-line
          console.log(vc.red('Component Loader').dark(`Empty _components file found in ${fileName}`));
        }
      }
    });

    return components;
  },

  get3(context, scopeName) {
    const components = {};

    context.keys().forEach((fileName) => {
      const match = fileName.match(/(?:\/components|\.)\/([^/]+)\/index\.js$$/);
      if (match) {
        // const componentGroupName = match[1];
        const componentGroup = context(fileName).default;

        if (componentGroup) {
          Object.keys(componentGroup).forEach((componentName) => {
            let scope = components;

            if (scopeName) {
              const computedScope = `scope_${scopeName({ componentGroup, fileName })}`;

              if (typeof components[computedScope] === 'undefined') {
                components[computedScope] = {};
              }

              scope = components[computedScope];
            }

            if (typeof scope[componentName] === 'undefined') {
              scope[componentName] = componentGroup[componentName];
            } else {
              // eslint-disable-next-line
              console.log(vc.red('Component Loader').dark(`${componentName} is already defined in ${fileName}`));
            }
          });
        } else {
          // eslint-disable-next-line
          console.log(vc.red('Component Loader').dark(`Empty _components file found in ${fileName}`));
        }
      }
    });

    return components;
  },

  get4(context, scopeName) {
    const components = {};

    context.keys().forEach((fileName) => {
      const match = fileName.match(/(?:\/components|\.)\/([^/]+)\/index\.js$$/);
      if (match) {
        // const componentGroupName = match[1];
        const componentGroup = context(fileName).default;

        if (componentGroup) {
          Object.keys(componentGroup).forEach((componentName) => {
            let scope = components;

            if (scopeName) {
              const computedScope = `scope_${scopeName({ componentGroup, fileName })}`;

              if (typeof components[computedScope] === 'undefined') {
                components[computedScope] = {};
              }

              scope = components[computedScope];
            }

            if (typeof scope[componentName] === 'undefined') {
              scope[componentName] = componentGroup[componentName];
            } else {
              // eslint-disable-next-line
              console.log(vc.red('Component Loader').dark(`${componentName} is already defined in ${fileName}`));
            }
          });
        } else {
          // eslint-disable-next-line
          console.log(vc.red('Component Loader').dark(`Empty _components file found in ${fileName}`));
        }
      }
    });

    return components;
  },

  get5(context, scopeName) {
    const components = {};

    context.keys().forEach((fileName) => {
      const match = fileName.match(/(?:\/components|\.)\/([^/]+)\/index\.js$$/);
      if (match) {
        // const componentGroupName = match[1];
        const componentGroup = context(fileName).default;

        if (componentGroup) {
          Object.keys(componentGroup).forEach((componentName) => {
            let scope = components;

            if (scopeName) {
              const computedScope = `scope_${scopeName({ componentGroup, fileName })}`;

              if (typeof components[computedScope] === 'undefined') {
                components[computedScope] = {};
              }

              scope = components[computedScope];
            }

            if (typeof scope[componentName] === 'undefined') {
              scope[componentName] = componentGroup[componentName];
            } else {
              // eslint-disable-next-line
              console.log(vc.red('Component Loader').dark(`${componentName} is already defined in ${fileName}`));
            }
          });
        } else {
          // eslint-disable-next-line
          console.log(vc.red('Component Loader').dark(`Empty _components file found in ${fileName}`));
        }
      }
    });

    return components;
  },

  get6(context, scopeName) {
    const components = {};

    context.keys().forEach((fileName) => {
      const match = fileName.match(/(?:\/components|\.)\/([^/]+)\/index\.js$$/);
      if (match) {
        // const componentGroupName = match[1];
        const componentGroup = context(fileName).default;

        if (componentGroup) {
          Object.keys(componentGroup).forEach((componentName) => {
            let scope = components;

            if (scopeName) {
              const computedScope = `scope_${scopeName({ componentGroup, fileName })}`;

              if (typeof components[computedScope] === 'undefined') {
                components[computedScope] = {};
              }

              scope = components[computedScope];
            }

            if (typeof scope[componentName] === 'undefined') {
              scope[componentName] = componentGroup[componentName];
            } else {
              // eslint-disable-next-line
              console.log(vc.red('Component Loader').dark(`${componentName} is already defined in ${fileName}`));
            }
          });
        } else {
          // eslint-disable-next-line
          console.log(vc.red('Component Loader').dark(`Empty _components file found in ${fileName}`));
        }
      }
    });

    return components;
  },
};
