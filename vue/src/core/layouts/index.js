// import { ComponentLoader } from '@/core/loaders';

// export default ComponentLoader.run({
//   None: () => import(/* webpackChunkName: "TeeDevLayouts" */ './None'),
// }, 'core');

import Vue from 'vue';
import NoneLayout from './None';

Vue.component('none-layout', NoneLayout);
