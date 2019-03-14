import stylis from 'stylis';

const styles = {
  themedScopes: {},
  apply(scope, themeFunc, component) {
    const css = themeFunc(component.$theme);

    const compliedCSS = [];
    if (typeof css === 'object') {
      if (css.global) {
        compliedCSS.push(this.complieCSS(null, css.global, component.$theme));
      }
      if (css.scoped) {
        compliedCSS.push(this.complieCSS(scope, css.scoped, component.$theme));
      }
    } else {
      compliedCSS.push(this.complieCSS(scope, css, component.$theme));
    }

    const styleSheet = this.createStyleSheet(component.$theme, compliedCSS.join(' '));

    if (!this.themedScopes[component.$theme.scope]) {
      this.themedScopes[component.$theme.scope] = {};
    }

    this.themedScopes[component.$theme.scope][scope] = {
      themeFunc,
      styleSheet,
      component,
    };
  },

  complieCSS(scope, css, theme) {
    if (scope) {
      return stylis('', this.addThemeScope(css, theme)).replace(/(?:^|}|\s)((?:\.|#)[\S]+?)({|,|::)/g, `$1[${scope}]$2`);
    }

    return stylis('', this.addThemeScope(css, theme));
  },

  addThemeScope(css, theme) {
    let scopedCss = `.teedev-theme[${theme.scope}]{${css}}`;

    for (let i = 0; i < theme.parentScopes.length; i += 1) {
      const parentScope = theme.parentScopes[i];

      scopedCss = `.teedev-theme[${parentScope}]{${scopedCss}}`;
    }

    return scopedCss;
  },

  createStyleSheet(theme, css) {
    const sheet = document.createElement('style');
    sheet.innerHTML = css;
    sheet.id = `[${theme.scope}][${theme.name}]`;
    return document.head.appendChild(sheet);
  },

  regenTheme() {
    const themes = Object.keys(this.themedScopes);
    for (let i = 0; i < themes.length; i += 1) {
      const theme = this.themedScopes[themes[i]];
      const scopes = Object.keys(theme);
      for (let l = 0; l < scopes.length; l += 1) {
        const scope = scopes[l];
        const scopeData = theme[scope];

        document.head.removeChild(scopeData.styleSheet);

        this.apply(scope, scopeData.themeFunc, scopeData.component);
      }
    }
  },
};

export default styles;

export const installer = (Vue) => {
  Vue.prototype.$styles = styles;

  Vue.mixin({
    beforeMount() {
      if (this.$options.theme && this.$theme) {
        if (!this.$styles.themedScopes[this.$theme.scope]) {
          this.$styles.themedScopes[this.$theme.scope] = {};
        }

        /* eslint-disable-next-line */
        if (!this.$styles.themedScopes[this.$theme.scope][this.$options._scopeId]) {

          /* eslint-disable-next-line */
          this.$styles.apply(this.$options._scopeId, this.$options.theme, this);
        }
      }
    },

    computed: {
      $theme() {
        if (this.$parent && this.$parent.$theme) {
          return this.$parent.$theme;
        }

        return null;
      },
    },
  });
};
