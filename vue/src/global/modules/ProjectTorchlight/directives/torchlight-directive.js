import Vue from 'vue';
import Torchlight from '../assets/js/torchlight';

Vue.directive('torchlight-canvas', {
  inserted: function(el, binding, vNode) {
    const torchlight = new Torchlight(el);

    if (binding.value) {
      binding.value(torchlight);
    }
  }
});