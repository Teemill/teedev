import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './vconsole';
// import './dom-collector';
import './helpers';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);

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
