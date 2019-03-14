import Shell from './shell';
import Plugins from '@/global/plugins';
import Components from '@/global/components';
import Pages from '@/global/pages';
import Store from '@/global/store';

// import { BaseLoader } from '@/core/new_loaders';

// const Plugins = import(/* webpackChunkName: "GlobalPlugins" */ '@/global/plugins');
// const Components = import(/* webpackChunkName: "GlobalComponents" */ '@/global/components');
// const Pages = import(/* webpackChunkName: "GlobalPages" */ '@/global/pages');
// const Store = import(/* webpackChunkName: "GlobalStore" */ '@/global/store');

// BaseLoader.unloadScope('global');

// BaseLoader.unload(Plugins);

export {
  Shell,
  Plugins,
  Components,
  Pages,
  Store,
};
