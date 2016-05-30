'use strict';
let $ = require('autoload-modules')({paths: module.paths});

module.exports = class {

  constructor(options = {}) {
    let that = this;
    let defaultOptions = {
      log: console.log,
      pairJoin: ': ',
      inlineJoin: ', ',
      labelStyle: (text) => '' + text,
      textStyle: (text) => '' + text
    };

    that.options = {};

    Object.keys(defaultOptions).forEach((index) => {
      that.options[index] = (options.hasOwnProperty(index)) ? options[index] : defaultOptions[index];
    });

    return that;
  }

  doLog(text = '', log = true) {
    let that = this;

    if (log) {
      that.options.log(text);
    }
  }

  doMultiLog(data = [], inline = false, log = true) {
    let that = this;
    
    if (inline) {
      return that.inline(data, log);
    }

    data.forEach((item) => {
      that.doLog(item, log);
    });

    return data;
  }

  style(text = '', textStyle = this.options.textStyle, log = true) {
    let that = this;
    let useText = textStyle(text);
    that.doLog(useText, log);
    return useText;
  }

  format(text = '', args = [], textStyle = this.options.textStyle, log = true) {
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

  pair(label = '', text = '', {labelStyle = this.options.labelStyle, textStyle = this.options.textStyle} = {}, log = true) {
    let that = this;
    let useText = labelStyle(label + that.options.pairJoin) + textStyle(text);
    that.doLog(useText, log);
    return useText;
  }

  pairArray(items = [], inline = false, log = true) {
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

    return that.doMultiLog(data, inline, log);
  }

  pairObject(items = {}, inline = false, log = true) {
    let that = this;
    let data = [];

    Object.keys(items).forEach((index) => {
      data.push(that.pair(index, items[index], {}, false));
    });

    return that.doMultiLog(data, inline, log);
  }

};
