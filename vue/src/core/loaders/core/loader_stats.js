export default class LoaderStats {
  constructor() {
    this.loaders = {};
  }

  addItem(item, type) {
    const loaderName = `${type}:${item.loader.type}`;

    if (!this.loaders[loaderName]) {
      this.loaders[loaderName] = {
        name: item.loader.type,
        type,
        moduleCount: 0,
        scopes: new Set(),
      };
    }

    this.loaders[loaderName].moduleCount += 1;
    this.loaders[loaderName].scopes.add(item.scope);
  }

  logStats() {
    const loaderNames = Object.keys(this.loaders);

    loaderNames.forEach((loaderName) => {
      const loader = this.loaders[loaderName];

      console.log(
        vc.green(`${ucfirst(loader.name)} Loader`)
          .dark(`${ucfirst(loader.type)}`)
          .light(loader.moduleCount)
          .dark(`${plural(loader.name, loader.moduleCount)} into the`)
          .light(Array.from(loader.scopes).join(', '))
          .dark(plural('scope', loader.scopes.size)),
      );
    });
  }
}
