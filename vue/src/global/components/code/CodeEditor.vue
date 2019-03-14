<template>
  <div class="teedev-code-editor">
    <pre ref="editor"></pre>
  </div>
</template>

<script>
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/theme-monokai';
import './themes/theme-one-dark';

export default {
  name: 'teedev-code-editor',

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    editor: null,
  }),

  mounted() {
    this.editor = ace.edit(this.$refs.editor); // eslint-disable-line
    this.editor.getSession().setValue(this.value);

    this.editor.setTheme('ace/theme/onedark');
    this.editor.getSession().setMode({ path: 'ace/mode/php', inline: true });

    this.editor.getSession().on('change', () => {
      this.$emit('input', this.editor.getSession().getValue());
    });

    this.editor.on('blur', () => {
      this.$emit('blur');
    });

    this.editor.on('focus', () => {
      this.$emit('focus');
    });
  },

  watch: {
    value(value) {
      if (!this.editor.isFocused()) {
        this.editor.getSession().setValue(value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.teedev-code-editor {
  margin-bottom: 1em;
}
</style>

<style lang="scss">
  .ace_editor {
    width: 100%;
    min-height: 400px;
    margin: 0;
    font-size: 1em;
    font-family: 'Fira Code';
    border-radius: $border-radius;

    .ace_scroller,
    .ace_gutter {
      // padding: 1em 0;
    }
  }
</style>
