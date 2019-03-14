import { Boot } from '@/core';
import App from './App.vue';
import '@/global';

import { Guards as GlobalGuards } from '@/global/router';

console.log(GlobalGuards);

/**
 * Bootstrap the app.
 */
Boot({
  App,
});
