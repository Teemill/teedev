import { BaseLoader } from '.';
import { Store } from '@/core';

const load = (item) => {
  Store.registerModule([...item.modulePath], item.module);
};

const unload = (item) => {
  Store.unregisterModule([...item.modulePath]);
};

const get = (item) => {
  const itemFileName = item.fileName
    .match(/(?:\/store|\.)\/([^/]+)\/index\.js$/)[1]
    .replace(/^\/|\/$/g, '');

  item.name = itemFileName.replace(/\//g, '-');
  item.module = item.module.default;
  item.modulePath = itemFileName.split('/');

  return item;
};

export default new BaseLoader(
  'store',
  load,
  unload,
  get,
);
