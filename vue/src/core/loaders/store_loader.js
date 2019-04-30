import { BaseLoader } from '.';
import { Store } from '@/core';

const load = ({ modulePath, module }) => {
  Store.registerModule([...modulePath], module);
};

const unload = (item) => {
  Store.unregisterModule([...item.modulePath]);
};

const get = (item) => {
  const itemFileName = item.fileName
    .match(/(?:\/store|\.)\/([^/]+)\/index\.js$/)[1]
    .replace(/^\/|\/$/g, '');

  item.name = itemFileName.replace(/\//g, '-');
  item.modulePath = itemFileName.split('/');
  item.module = item.module.default;

  return item;
};

export default new BaseLoader(
  'store',
  load,
  unload,
  get,
);
