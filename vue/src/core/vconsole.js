class VConsole {
  constructor() {
    this.logString = '';
    this.logStyles = [];

    this.styles = {
      base: 'padding: 0.25em 0.4em; margin: 2px 0 4px;',
      startSection: 'border-top-left-radius: 3px; border-bottom-left-radius: 3px;',
      endSection: 'border-top-right-radius: 3px; border-bottom-right-radius: 3px;',
      lighter: 'background-color: #546E7A; color: #fff;',
      light: 'background-color: #455A64; color: #fff;',
      dark: 'background-color: #37474F; color: #fff;',
      darker: 'background-color: #263238; color: #fff;',
      red: 'background-color: #ef5350; color: #fff;',
      green: 'background-color: #66BB6A; color: #fff;',
      blue: 'background-color: #42a5f5; color: #fff;',
      orange: 'background-color: #ffa726; color: #fff;',
      purple: 'background-color: #ab47bc; color: #fff;',
      lime: 'background-color: #9ccc65; color: #fff;',
    };
  }

  static text(string) { return new VConsole().text(string); }

  static lighter(string) { return new VConsole().lighter(string); }

  static light(string) { return new VConsole().light(string); }

  static dark(string) { return new VConsole().dark(string); }

  static darker(string) { return new VConsole().darker(string); }

  static red(string) { return new VConsole().red(string); }

  static green(string) { return new VConsole().green(string); }

  static blue(string) { return new VConsole().blue(string); }

  static orange(string) { return new VConsole().orange(string); }

  static purple(string) { return new VConsole().purple(string); }

  static lime(string) { return new VConsole().lime(string); }

  static error(string) { return new VConsole().error(string); }

  static warn(string) { return new VConsole().warn(string); }

  static info(string) { return new VConsole().info(string); }

  text(string) {
    this.appendString(string);
    return this;
  }

  lighter(string) {
    this.appendString(string, 'lighter');
    return this;
  }

  light(string) {
    this.appendString(string, 'light');
    return this;
  }

  dark(string) {
    this.appendString(string, 'dark');
    return this;
  }

  darker(string) {
    this.appendString(string, 'darker');
    return this;
  }

  red(string) {
    this.appendString(string, 'red');
    return this;
  }

  green(string) {
    this.appendString(string, 'green');
    return this;
  }

  blue(string) {
    this.appendString(string, 'blue');
    return this;
  }

  orange(string) {
    this.appendString(string, 'orange');
    return this;
  }

  purple(string) {
    this.appendString(string, 'purple');
    return this;
  }

  lime(string) {
    this.appendString(string, 'lime');
    return this;
  }

  error(string) {
    this.appendString('ERROR', 'red');
    this.appendString(string, 'dark');
    return this;
  }

  warn(string) {
    this.appendString('WARN', 'orange');
    this.appendString(string, 'dark');
    return this;
  }

  info(string) {
    this.appendString('INFO', 'blue');
    this.appendString(string, 'dark');
    return this;
  }

  appendString(string, style) {
    this.logString += `%c${string}`;

    let styles = this.styles.base;

    if (
      this.logStyles.length === 0
    || !this.getPreviousStyle().match(/background-color/)
    ) {
      styles += this.styles.startSection;
    }

    if (style) {
      styles += this.styles[style];
    }

    if (!styles.match(/background-color/)) {
      this.appendPreviousStyle(this.styles.endSection);
    }

    this.logStyles.push(styles);
  }

  appendStyleToLast(style) {
    this.appendPreviousStyle(this.styles[style]);
  }

  getPreviousStyle() {
    return this.logStyles[this.logStyles.length - 1];
  }

  setPreviousStyle(style) {
    this.logStyles[this.logStyles.length - 1] = style;
  }

  appendPreviousStyle(style) {
    this.setPreviousStyle(this.getPreviousStyle() + style);
  }

  toString() {
    this.appendStyleToLast('endSection');

    return [
      this.logString,
      ...this.logStyles,
    ];
  }
}

const nativeConsoleLog = console.log;
console.log = (...params) => {
  let newParams = [];
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    if (param instanceof VConsole) {
      newParams = [...newParams, ...param.toString()];
    } else {
      newParams.push(param);
    }
  }
  nativeConsoleLog(...newParams);
};

window.vc = VConsole;

export default VConsole;
