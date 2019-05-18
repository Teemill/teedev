import Vue from 'vue';

import Shell from './shell';
import Plugins from '@/global/plugins';
import Components from '@/global/components';
import Pages from '@/global/pages';
import Store from '@/global/store';

import '@/global/assets/scss/core.scss';

import StandardLayout from '@/global/layouts/Standard';
import OnepagerLayout from '@/global/layouts/Onepager';

Vue.component('standard-layout', StandardLayout);
Vue.component('standard-onepager', OnepagerLayout);

export {
  Shell,
  Plugins,
  Components,
  Pages,
  Store,
};
