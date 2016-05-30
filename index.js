'use strict';
let $ = require('autoload-modules')({paths: module.paths});

module.exports = class {
  that = this;

  options = {
    log: console.log, pairJoin: ': ', inlineJoin: ', ', labelStyle: (text) => '' + text, textStyle: (text) => '' + text
  };

  constructor(options = {}) {
    let that = this;

    Object.keys(that.options).forEach((index)=> {
      if (options.hasOwnProperty(index)) {
        that.options[index] = options[index];
      }
    });

    return that;
  }

  doLog(text = '', log = true) {
    let that = this;

    if (log) {
      that.options.log(text);
    }
  }

  style(text = '', textStyle = that.options.textStyle, log = true) {
    let that = this;
    let useText = textStyle(text);
    that.doLog(useText, log);
    return useText;
  }

  format(text = '', args = [], textStyle = that.options.textStyle, log = true) {
    let that = this;
    args.unshift(text);
    return that.style($.util.format.apply(null, args), textStyle, log);
  }

  multiLine(items = [], log = true) {
    let that = this;
    let options = that.options;
    let data = [];

    items.forEach((item) => {
      if ($.util.isArray(item)) {
        let [text = '', textStyle = options.textStyle] = item;
        data.push(textStyle(text));
      } else {
        data.push(options.textStyle(item));
      }
    });

    data.forEach((item) => {
      that.doLog(item, log);
    });

    return data;
  }

  inline(items = [], log = true) {
    let that = this;
    let options = that.options;
    let data = [];

    items.forEach((item) => {
      if ($.util.isArray(item)) {
        let [text = '', textStyle = options.textStyle] = item;
        data.push(textStyle(text));
      } else {
        data.push(options.textStyle(item));
      }
    });

    let useText = data.join(options.inlineJoin);
    that.doLog(useText, log);
    return useText;
  }

  pair(label = '', text = '', {labelStyle = that.options.labelStyle, textStyle = that.options.textStyle} = {}, log = false) {
    let that = this;
    let useText = labelStyle(label + that.options.pairJoin) + textStyle(text);
    that.doLog(useText, log);
    return useText;
  }

  pairItems(items = [], inline = false, log = false) {
    let that = this;
    let options = that.options;
    let data = [];

    items.forEach((item) => {
      if ($.util.isArray(item)) {
        let [label = '', text = '', style = {}] = item;
        data.push(that.pair(label, text, style, false));
      } else {
        data.push(options.textStyle(item));
      }
    });

    if (inline) {
      return that.inline(data, log);
    }

    data.forEach((item) => {
      that.doLog(item, log);
    });

    return data;
  }
};
