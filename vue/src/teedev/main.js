import { Boot } from '@/core';
import App from './App.vue';
import '@/global';

import './pages';

// What the fuck is this Charles?
// import { Guards as GlobalGuards } from '@/global/router';
// import { Guards as LocalGuards } from '@/teemill/router';

/**
 * Bootstrap the app.
 */
Boot({
  App,
});
