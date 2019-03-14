import Vue from 'vue';
import Cookies from 'js-cookie';

import OrangeLogo from '@/global/assets/logo/teedev-orange.svg';
import PurpleLogo from '@/global/assets/logo/teedev-purple.svg';
import CynicalLogo from '@/global/assets/logo/teedev-cynical.svg';

let currentTheme = Cookies.get('teedev-theme');

if (!currentTheme) {
  currentTheme = 'purple';
}

export default {
  namespaced: true,
  state: {
    currentTheme,

    themes: {
      orange: {
        name: 'orange',
        logo: OrangeLogo,
        colors: {
          primary: '#ec8d52',
          gradientPrimary: '#a94747',
          highlight: 'rgba(0,0,0,0.05)',
          background: '#ffffff',
          text: '#222222',
        },
      },

      purple: {
        name: 'purple',
        logo: PurpleLogo,
        colors: {
          primary: '#8f71b3',
          gradientPrimary: '#484d99',
          highlight: 'rgba(0,0,0,0.05)',
          background: '#ffffff',
          text: '#222222',
        },
      },

      cynical: {
        name: 'cynical',
        logo: CynicalLogo,
        colors: {
          primary: '#888888',
          gradientPrimary: '#444444',
          highlight: 'rgba(0,0,0,0.05)',
          background: '#ffffff',
          text: '#222222',
        },
      },
    },
  },

  mutations: {
    set(state, theme) {
      if (state.themes[theme]) {
        state.currentTheme = theme;
        Cookies.set('teedev-theme', theme);
        Vue.prototype.$styles.regenTheme();
      }
    },
  },

  getters: {
    get: state => (themeName) => {
      if (themeName && state.themes[themeName]) {
        state.themes[themeName].name = themeName;
        return state.themes[themeName];
      }

      if (state.themes[state.currentTheme]) {
        state.themes[state.currentTheme].name = state.currentTheme;
        return state.themes[state.currentTheme];
      }

      return state.themes.cynical;
    },

    getColor: (state, getters) => (name, themeName) => {
      const theme = getters.get(themeName);

      if (theme) {
        return theme.colors[name];
      }

      return null;
    },
  },
};
