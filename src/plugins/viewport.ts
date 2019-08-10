import { PluginObject } from 'vue';
import { Breakpoint } from '@/types/breakpoint';

export const ViewportPlugin = {
  install(Vue): void {
    Vue.prototype.$viewport = this;

    window.addEventListener('resize', this.onResize);
    this.onResize();
  },

  onResize(): void {
    console.log(window.innerWidth);
  },

  breakpoint: Breakpoint.get('sm'),
} as PluginObject<void>;
