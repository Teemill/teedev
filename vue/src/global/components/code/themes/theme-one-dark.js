// eslint-disable-next-line
ace.define(
  'ace/theme/onedark',
  [
    'require',
    'exports',
    'module',
    'ace/lib/dom',
  ],
  (require, exports) => {
    exports.isDark = true;
    exports.cssClass = 'ace-onedark';
    exports.cssText = `
      .ace-onedark .ace_gutter {
        background: #282C34;
        color: #abb2bf;
      }
      .ace-onedark .ace_print-margin {
        width: 1px;
        background: #555651
      }
      .ace-onedark {
        background-color: #282C34;
        color: #abb2bf;
      }
      .ace-onedark .ace_cursor {
        color: #abb2bf;
      }
      .ace-onedark .ace_marker-layer .ace_selection {
        background: #49483E;
      }
      .ace-onedark.ace_multiselect .ace_selection.ace_start {
        box-shadow: 0 0 3px 0px #272822;
      }
      .ace-onedark .ace_marker-layer .ace_step {
        background: rgb(102, 82, 0);
      }
      .ace-onedark .ace_marker-layer .ace_bracket {
        margin: -1px 0 0 -1px;
        border: 1px solid #49483E;
      }
      .ace-onedark .ace_marker-layer .ace_active-line {
        background: #202020;
      }
      .ace-onedark .ace_gutter-active-line {
        background-color: #272727;
      }
      .ace-onedark .ace_marker-layer .ace_selected-word {
        border: 1px solid #49483E;
      }
      .ace-onedark .ace_invisible {
        color: #52524d;
      }
      .ace-onedark .ace_entity.ace_name.ace_tag,
      .ace-onedark .ace_keyword,
      .ace-onedark .ace_meta.ace_tag,
      .ace-onedark .ace_storage {
        color: #c678dd;
      }
      .ace-onedark .ace_punctuation,
      .ace-onedark .ace_punctuation.ace_tag {
        color: #abb2bf;
      }
      .ace-onedark .ace_constant.ace_character,
      .ace-onedark .ace_constant.ace_language,
      .ace-onedark .ace_constant.ace_numeric,
      .ace-onedark .ace_constant.ace_other {
        color: #AE81FF;
      }
      .ace-onedark .ace_invalid {
        color: #F8F8F0;
        background-color: #F92672;
      }
      .ace-onedark .ace_invalid.ace_deprecated {
        color: #F8F8F0;
        background-color: #AE81FF;
      }
      .ace-onedark .ace_support.ace_constant,
      .ace-onedark .ace_support.ace_function {
        color: #c678dd;
      }
      .ace-onedark .ace_fold {
        background-color: #A6E22E;
        border-color: #F8F8F2;
      }
      .ace-onedark .ace_storage.ace_type,
      .ace-onedark .ace_support.ace_class,
      .ace-onedark .ace_support.ace_type {
      font-style: italic;
        color: #c678dd;
      }
      .ace-onedark .ace_entity.ace_name.ace_function,
      .ace-onedark .ace_entity.ace_other,
      .ace-onedark .ace_entity.ace_other.ace_attribute-name,
      .ace-onedark .ace_variable {
        color: #d19a66;
      }
      .ace-onedark .ace_variable.ace_parameter {
        font-style: italic;
        color: #d19a66;
      }
      .ace-onedark .ace_string {
        color: #98c379;
      }
      .ace-onedark .ace_comment {
        color: #5c6370;
      }
      .ace-onedark .ace_indent-guide {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y\
      }
      .ace-onedark .ace_identifier {
        color: #61afef;
      }
      .ace-onedark .ace_type + .ace_identifier {
        color: #e06c75;
      }
    `;

    // const dom = require('../lib/dom');
    // dom.importCssString(exports.cssText, exports.cssClass);
  },
);

(
  () => {
    // eslint-disable-next-line
    ace.require(
      ['ace/theme/onedark'],
      (m) => {
        if (typeof module === 'object' && typeof exports === 'object' && module) {
          module.exports = m;
        }
      },
    );
  }
)();
