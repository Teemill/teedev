import Vue from 'vue';
import { BaseLoader } from '.';
import { Store, Router } from '@/core';

const load = (item) => {
  Vue.use({
    install: item.module.installer,
  }, { Store, Router });
};

const unload = (item) => {
  Vue.unuse({
    uninstall: item.module.uninstaller,
  }, { Store, Router });
};

export default new BaseLoader(
  'plugin',
  load,
  unload,
);
