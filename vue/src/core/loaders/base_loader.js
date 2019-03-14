function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class Loader {
  static loadedItems = {};

  constructor(type, onLoadItem, onUnloadItem, onGetItem) {
    this.items = {};
    this.type = type;
    this.onLoadItem = onLoadItem;
    this.onUnloadItem = onUnloadItem;
    this.onGetItem = onGetItem;
  }

  run(context, scope) {
    const items = this.get(context, scope);
    this.load(items);

    return items;
  }

  load(items) {
    if (Array.isArray(items)) {
      let loadedCount = 0;
      const loadedScopes = new Set();

      items.forEach((item) => {
        if (this.loadItem(item, false)) {
          loadedCount += 1;
          loadedScopes.add(item.scope);
        }
      });

      console.log(
        vc.green(`${this.getLoaderName()} Loader`)
          .dark('Loaded')
          .light(loadedCount)
          .dark(`${this.type}s into the`)
          .light(Array.from(loadedScopes).join(', '))
          .dark('scope'),
      );
    } else {
      this.loadItem(items);
    }

    return true;
  }

  loadItem(item, showLog = true) {
    if (this.onLoadItem(item) !== false) {
      this.addLoadedItem(item);

      if (showLog) {
        console.log(
          vc.green(`${this.getLoaderName()} Loader`)
            .dark('Loaded')
            .light(1)
            .dark(`${this.type}s into the`)
            .light(item.scope)
            .dark('scope'),
        );
      }

      return true;
    }

    console.log(vc.red(`${this.getLoaderName()} Loader`).dark('Failed to load item'));

    return false;
  }

  unload(items) {
    if (Array.isArray(items)) {
      let unloadedCount = 0;
      const unloadedScopes = new Set();

      items.forEach((item) => {
        if (this.unloadItem(item)) {
          unloadedCount += 1;
          unloadedScopes.add(item.scope);
        }
      });

      console.log(
        vc.green(`${this.getLoaderName()} Loader`)
          .dark('Unloaded')
          .light(unloadedCount)
          .dark(`${this.type}s from the`)
          .light(Array.from(unloadedScopes).join(', '))
          .dark('scope'),
      );
    } else {
      this.unloadItem(items);
    }

    return true;
  }

  unloadItem(item, showLog = true) {
    if (this.onUnloadItem(item) !== false) {
      this.removeLoadedItem(item);

      if (showLog) {
        console.log(
          vc.green(`${this.getLoaderName()} Loader`)
            .dark('Unloaded')
            .light(1)
            .dark(`${this.type}s from the`)
            .light(item.scope)
            .dark('scope'),
        );
      }

      return true;
    }

    console.log(vc.red(`${this.getLoaderName()} Loader`).dark('Failed to unload item'));

    return false;
  }

  get(context, scope) {
    if (!scope) {
      scope = 'global';
    }

    const items = [];

    context.keys().forEach((moduleDir) => {
      const module = context(moduleDir);

      if (module.default) {
        const item = {
          scope,
          module,
          type: this.type,
          name: Loader.getItemName(moduleDir),
          fileName: moduleDir,
          loader: this,
        };

        if (this.onGetItem) {
          const customItems = this.onGetItem(item);

          if (Array.isArray(customItems)) {
            customItems.forEach((customItem) => {
              items.push(customItem);
            });
          } else {
            items.push(customItems);
          }
        } else {
          items.push(item);
        }
      }
    });

    return items;
  }

  static unload(item) {
    console.log(vc.orange('Static Unload'));

    if (Array.isArray(item)) {
      Loader.unloadItems(item);
    } else {
      Loader.unloadItem(item);
    }
  }

  static unloadItems(items) {
    console.log(vc.orange('Static Unload Items'));

    let unloadedCount = 0;
    const unloadedScopes = new Set();

    items.forEach((item) => {
      if (Loader.unloadItem(item)) {
        unloadedCount += 1;
        unloadedScopes.add(item.scope);
      }
    });

    console.log(
      // vc.green(`${this.getLoaderName()} Loader`)
      vc.dark('Unloaded')
        .light(unloadedCount)
        // .dark(`${this.type}s from the`)
        .light(Array.from(unloadedScopes).join(', '))
        .dark('scope'),
    );
  }

  static unloadItem(item) {
    console.log(vc.orange('Static Unload Item'));
    console.log(item);

    console.log(item.loader.unloadItem(item));
  }

  static unloadScope(scopeName) {
    const scope = this.loadedItems[scopeName];

    if (!scope) {
      console.log(vc.red('Loader').dark('Failed to find scope'));

      return false;
    }

    Object.values(scope).forEach((itemType) => {
      Object.values(itemType).forEach((item) => {
        item.loader.unload(item);
      });
    });

    return true;
  }

  static getItemName(fileName) {
    const match = fileName.match(/\/([^/]+)\/index\.js$/);

    if (match) {
      return match[1];
    }

    return 'unknown';
  }

  getLoaderName() {
    return ucfirst(this.type);
  }

  addLoadedItem(item) {
    if (!Loader.loadedItems[item.scope]) {
      Loader.loadedItems[item.scope] = {};
    }

    if (!Loader.loadedItems[item.scope][this.type]) {
      Loader.loadedItems[item.scope][this.type] = {};
    }

    Loader.loadedItems[item.scope][this.type][item.name] = item;

    return true;
  }

  removeLoadedItem(item) {
    if (!Loader.loadedItems[item.scope]) {
      return false;
    }

    if (!Loader.loadedItems[item.scope][this.type]) {
      return false;
    }

    delete Loader.loadedItems[item.scope][this.type][item.name];

    return true;
  }
}

export default Loader;
