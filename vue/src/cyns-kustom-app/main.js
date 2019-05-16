// Oi.. Get your dirty mits of my code.

import { Boot } from '@/core';
import App from './App.vue';
import '@/global';

import './pages';

// What the fuck is this Charles?
// import { Guards as GlobalGuards } from '@/global/router';
// console.log(GlobalGuards);

/**
 * Bootstrap the app.
 */
Boot({
  App,
});
