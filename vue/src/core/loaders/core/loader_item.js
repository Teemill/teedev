import Loader from './loader';

export default class LoaderItem {
  constructor(loader, scope, module, fileName) {
    this.loader = loader;
    this.scope = scope;
    this.module = module;
    this.fileName = fileName;
  }

  get name() {
    if (this._name) {
      return this._name;
    }

    const match = this.fileName.match(/\/([^/]+)\/index\.js$/);

    if (match) {
      return match[1];
    }

    return 'unknown';
  }

  set name(value) {
    this._name = value;
  }

  copy() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  load() {
    if (!this.loader.onLoad(this) === false) {
      console.log(
        vc.red(`${this.loader.name} Loader`)
          .dark('Failed to load')
          .light(this.name)
          .dark(this.loader.type)
          .dark('into the')
          .light(this.scope)
          .dark('scope'),
      );

      return false;
    }

    Loader.loadedItems.push(this);

    return true;
  }

  unload() {
    if (this.loader.onUnload(this) === false) {
      console.log(
        vc.red(`${this.loader.name} Loader`)
          .dark('Failed to unload')
          .light(this.name)
          .dark(this.loader.type)
          .dark('into the')
          .light(this.scope)
          .dark('scope'),
      );

      return false;
    }

    Loader.loadedItems = Loader.loadedItems.filter(item => item !== this);

    return true;
  }
}
