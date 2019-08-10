import { PluginObject } from 'vue';
import { Breakpoint } from '@teedev/core';

export const ViewportPlugin = {
  install(Vue): void {
    Vue.prototype.$viewport = this;

    this.onResize = this.onResize.bind(this)

    window.addEventListener('resize', this.onResize);
    this.onResize();
  },

  onResize(): void {
    this.breakpoint = Breakpoint.get(window.innerWidth);
  },

  breakpoint: Breakpoint.get('sm'),
} as PluginObject<void>;
