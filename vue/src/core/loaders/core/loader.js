import LoaderItem from './loader_item';
import LoaderStats from './loader_stats';

export default class Loader {
  static loadedItems = [];

  constructor(loaderType, onLoad, onUnload, onGet) {
    this.type = loaderType;

    if (!onLoad) {
      console.log(
        vc.red(`${this.name} Loader`)
          .dark('Loader is missing an')
          .light('onLoad')
          .dark('callback'),
      );
    }

    this.onLoad = onLoad;
    this.onUnload = onUnload;
    this.onGet = onGet;
  }

  get name() {
    return this.type.charAt(0).toUpperCase() + this.type.slice(1);
  }

  run(context, scope) {
    const items = this.get(context, scope);

    Loader.load(items);

    return items;
  }

  get(context, scope) {
    if (!scope) {
      scope = 'global';
    }

    const items = [];

    context.keys().forEach((moduleDir) => {
      if (moduleDir !== './index.js') {
        const module = context(moduleDir);

        const item = new LoaderItem(
          this,
          scope,
          module,
          moduleDir,
        );

        if (this.onGet) {
          const customItems = this.onGet(item);

          if (customItems) {
            if (Array.isArray(customItems)) {
              customItems.forEach((customItem) => {
                items.push(customItem);
              });
            } else {
              items.push(customItems);
            }
          }
        } else {
          items.push(item);
        }
      }
    });

    return items;
  }


  /**
   * Load
   */

  static load(item) {
    if (Array.isArray(item)) {
      return Loader.loadItems(item);
    }

    return Loader.loadItem(item);
  }

  static loadItems(items) {
    const loaderStats = new LoaderStats();

    items.forEach((item) => {
      if (Loader.loadItem(item)) {
        loaderStats.addItem(item, 'loaded');
      }
    });

    loaderStats.logStats();
  }

  static loadItem(item) {
    const success = item.load();

    return success;
  }

  /**
   * Unload
   */

  static unloadScope(scopeName) {
    const loaderStats = new LoaderStats();

    Loader.loadedItems.forEach((item) => {
      if (item.scope === scopeName) {
        if (item.unload()) {
          loaderStats.addItem(item, 'unloaded');
        }
      }
    });

    loaderStats.logStats();
  }
}
