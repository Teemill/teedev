import { Boot } from '@/core';
import App from './App.vue';
import '@/global';

import {
  PageLoader,
  PluginLoader,
} from '@/core/loaders';

PluginLoader.run(require.context('./', true, /.*\/plugins\/([^/]+)\/index\.js$/), 'teemill');
PageLoader.run(require.context('./', true, /.*\/pages\/([^/]+)\/index\.js$/), 'teemill');

// Charles?
// import { Guards as GlobalGuards } from '@/global/router';
// import { Guards as LocalGuards } from '@/teemill/router';

/**
 * Bootstrap the app.
 */
Boot({
  App,
});
