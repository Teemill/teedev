<script>
export default {
  name: 'teedev-theme',
  render(h) {
    const el = h(
      'div',
      {
        class: ['teedev-theme'],
        attrs: {},
      },
      [this.$slots.default],
    );

    el.data.attrs[`theme-${this._uid}`] = ''; /* eslint-disable-line */

    return el;
  },
  props: {
    theme: String,
  },
  computed: {
    $theme() {
      const theme = this.$store.getters['theme/get'](this.theme);

      const newTheme = {
        ...theme,
        scope: `theme-${this._uid}`, /* eslint-disable-line */
        parentScopes: [],
      };

      if (this.$parent.$theme) {
        newTheme.parentScopes = [
          this.$parent.$theme.scope,
          ...this.$parent.$theme.parentScopes,
        ];
      }

      return newTheme;
    },
  },
};
</script>

<style lang="scss" scoped>
.teedev-theme {
  display: contents;
  width: 100%;
  height: 100%;
}
</style>
