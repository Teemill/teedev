import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Shell from './components/Shell';

// Import Core Helpers
import './helpers';
import './vconsole';

// Import Core Styles
import './assets/scss/core.scss';

import './layouts';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.component('shell', Shell);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vuex.Store.prototype.getter = function getter(type) {
  return this.getters[type];
};

const Store = new Vuex.Store();

const Router = new VueRouter({
  mode: 'history',
  routes: [],
});

const Boot = options => new Vue({
  router: Router,
  store: Store,
  render: h => h(options.App),
}).$mount('#app');

sync(Store, Router);

export {
  Boot,
  Store,
  Router,
};
